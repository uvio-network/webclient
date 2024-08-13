import moment from "moment";

import * as ToastSender from "@/components/toast/ToastSender";

import { ChainStore } from "@/modules/chain/ChainStore";
import { EditorMessage } from "@/components/app/claim/propose/editor/EditorStore";
import { EditorStore } from "@/components/app/claim/propose/editor/EditorStore";
import { HasDuplicate } from "@/modules/string/HasDuplicate";
import { MarketsPropose } from "@/modules/transaction/MarketsPropose";
import { PostCreate } from "@/modules/api/post/create/Create";
import { PostCreateRequest } from "@/modules/api/post/create/Request";
import { PostCreateResponse } from "@/modules/api/post/create/Response";
import { SplitList } from "@/modules/string/SplitList";
import { TimeFormat } from "@/modules/app/claim/propose/TimeFormat";
import { TokenConfig } from "@/modules/token/TokenConfig";
import { TokenMessage } from "@/modules/token/TokenStore";
import { TokenStore } from "@/modules/token/TokenStore";
import { UserMessage } from "@/modules/user/UserStore";
import { UserStore } from "@/modules/user/UserStore";
import { VoteCreate } from "@/modules/api/vote/create/Create";
import { VoteCreateRequest } from "@/modules/api/vote/create/Request";
import { VoteCreateResponse } from "@/modules/api/vote/create/Response";
import { WalletMessage } from "@/modules/wallet/WalletStore";
import { WalletStore } from "@/modules/wallet/WalletStore";

// SubmitForm validates user input and then performs the claim creation.
export const SubmitForm = async (suc: (pos: string, vot: string) => void) => {
  const chain = ChainStore.getState().getActive();
  const editor = EditorStore.getState();
  const token = TokenStore.getState().token;
  const user = UserStore.getState().user;
  const { wallet } = WalletStore.getState();

  // Note that the order of the validation blocks below accomodates the user
  // experience when validating user input in the claim editor. The order of the
  // blocks below corresponds with the order of input fields on the claim create
  // page.

  {
    if (!editor.markdown || editor.markdown === "") {
      return ToastSender.Error("The provided markdown must not be empty.");
    }
    if (editor.markdown.length <= 100) {
      return ToastSender.Error("The provided markdown must at least have 100 characters.");
    }
    if (editor.markdown.length >= 5000) {
      return ToastSender.Error("The provided markdown must not be longer than 5000 characters.");
    }
  }

  {
    const exp = /^[a-zA-Z0-9-\s]+$/;
    const lis = SplitList(editor.labels);

    if (!lis.every((x) => exp.test(x))) {
      return ToastSender.Error("The format for the claim labels must be alpha numerical.");
    }
    if (!editor.labels || editor.labels === "") {
      return ToastSender.Error("The proposed claim must have at least one category label.");
    }
    if (lis.length > 4) {
      return ToastSender.Error("The proposed claim must not have more than four category labels.");
    }
    if (HasDuplicate(lis)) {
      return ToastSender.Error("The proposed claim must not have duplicated category labels.");
    }
  }

  {
    if (!editor.expiry || editor.expiry === "") {
      return ToastSender.Error("The provided expiry must not be empty.");
    }
    if (!moment(editor.expiry, TimeFormat, true).isValid()) {
      return ToastSender.Error(`The provided expiry must be in the format ${TimeFormat}.`);
    }
    if (moment(editor.expiry, TimeFormat).isBefore(moment())) {
      return ToastSender.Error("The provided expiry must not be in past.");
    }
  }

  {
    const spl = editor.stake.split(" ");
    const num = spl[0];
    const sym = spl[1];
    const lis = Object.keys(chain.tokens);

    if (!editor.stake || editor.stake === "") {
      return ToastSender.Error("You must stake reputation with your claim.");
    }
    if (!inpPrt(editor.stake)) {
      return ToastSender.Error("Your staked reputation must be in teh format [number token].");
    }
    if (!inpNum(num)) {
      return ToastSender.Error("The amount of your stake must be a positive number.");
    }
    if (!inpSym(sym, lis)) {
      return ToastSender.Error(`You can only stake one of the whitelisted tokens: ${lis}.`);
    }
    if (!inpBal(num, sym, token)) {
      return ToastSender.Error(`You do not seem to have enough tokens to stake ${num} ${sym}.`);
    }
  }

  {
    ToastSender.Info("Alrighty pumpkin, let's see if you got all the marbles.");
  }

  const inp = {
    amount: newAmo(editor),
    expiry: newExp(editor),
    token: chain.tokens[editor.stake.split(" ")[1]],
  };

  const chn = await chnCre(wallet, inp);
  const pos = await posCre(chain.id, user, editor, chn);
  const vot = await votCre(chain.id, user, editor, pos);

  {
    ToastSender.Success("Hooray, thy claim proposed milady!");
    editor.delete();
    suc(pos.id, vot.id);
  }

  // TODO prevent duplicated submits
};

const inpBal = (num: string, sym: string, tok: TokenMessage): boolean => {
  const des = parseFloat(num);
  const cur = parseFloat(tok[sym]);

  return cur >= des;
};

// inpPrt returns true if the given input is a two part string separated by a
// single whitespace. We use this to ensure we get user input like shown below.
//
//     "0.003 ETH"
//
const inpPrt = (inp: string): boolean => {
  return inp.split(" ").length === 2;
};

// inpNum returns true if the given input string is an integer or floating point
// number.
//
//     5
//     0.003
//
const inpNum = (num: string): boolean => {
  if (num === "") return false;
  return parseFloat(num) > 0;
};

// inpSym returns true if the given input string has one of the whitelisted
// tokens as suffixe.
const inpSym = (sym: string, lis: string[]): boolean => {
  if (sym === "") return false;
  return lis.some((x) => x === sym);
};

const newAmo = (edi: EditorMessage): number => {
  return parseFloat(edi.stake.split(" ")[0]);
};

const newExp = (edi: EditorMessage): number => {
  return moment(edi.expiry, TimeFormat, true).unix();
};

const chnCre = async (wal: WalletMessage, inp: { amount: number, expiry: number, token: TokenConfig }): Promise<{ tree: string, claim: string }> => {
  try {
    const res = await MarketsPropose(wal, inp);
    return res;
  } catch (err) {
    console.error(err);
    ToastSender.Error(err instanceof Error ? err.message : String(err));
    return Promise.reject(err);
  }
}

const posCre = async (cid: number, use: UserMessage, edi: EditorMessage, chn: { tree: string, claim: string }): Promise<PostCreateResponse> => {
  const req: PostCreateRequest = {
    chain: cid.toString(),
    expiry: moment(edi.expiry, TimeFormat, true).unix().toString(),
    kind: "claim",
    labels: SplitList(edi.labels).join(","),
    lifecycle: "propose",
    meta: chn.tree + "," + chn.claim,
    parent: "",
    text: edi.markdown,
    token: edi.stake.split(" ")[1],
  };

  try {
    const [res] = await PostCreate(use.token, [req]);
    return res;
  } catch (err) {
    console.error(err);
    ToastSender.Error(err instanceof Error ? err.message : String(err));
    return Promise.reject(err);
  }
}

const votCre = async (cid: number, use: UserMessage, edi: EditorMessage, pos: PostCreateResponse): Promise<VoteCreateResponse> => {
  const req: VoteCreateRequest = {
    claim: pos.id,
    kind: "stake",
    option: "true",
    value: newAmo(edi).toString(),
  };

  try {
    const [res] = await VoteCreate(use.token, [req]);
    return res;
  } catch (err) {
    console.error(err);
    ToastSender.Error(err instanceof Error ? err.message : String(err));
    return Promise.reject(err);
  }
}
