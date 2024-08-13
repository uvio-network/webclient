import moment from "moment";

import * as ToastSender from "@/components/toast/ToastSender";

import { ChainStore } from "@/modules/chain/ChainStore";
import { EditorMessage } from "@/components/app/claim/propose/editor/EditorStore";
import { EditorStore } from "@/components/app/claim/propose/editor/EditorStore";
import { HasDuplicate } from "@/modules/string/HasDuplicate";
import { PostCreate } from "@/modules/api/post/create/Create";
import { PostCreateRequest } from "@/modules/api/post/create/Request";
import { PostCreateResponse } from "@/modules/api/post/create/Response";
import { SplitList } from "@/modules/string/SplitList";
import { TimeFormat } from "@/modules/app/claim/propose/TimeFormat";
import { UserMessage } from "@/modules/user/UserStore";
import { UserStore } from "@/modules/user/UserStore";
import { VoteCreate } from "@/modules/api/vote/create/Create";
import { VoteCreateRequest } from "@/modules/api/vote/create/Request";
import { VoteCreateResponse } from "@/modules/api/vote/create/Response";
import { TokenMessage, TokenStore } from "@/modules/token/TokenStore";

// SubmitForm validates user input and then performs the claim creation.
export const SubmitForm = async (suc: (pos: string, vot: string) => void) => {
  const chain = ChainStore.getState().getActive();
  const editor = EditorStore.getState();
  const token = TokenStore.getState().token;
  const user = UserStore.getState().user;

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

  const pos = await posCre(user, editor);
  const vot = await votCre(user, editor, pos);

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

const posCre = async (use: UserMessage, edi: EditorMessage): Promise<PostCreateResponse> => {
  const req: PostCreateRequest = {
    expiry: moment(edi.expiry, TimeFormat, true).unix().toString(),
    kind: "claim",
    labels: SplitList(edi.labels).join(","),
    lifecycle: "propose",
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

const votCre = async (use: UserMessage, edi: EditorMessage, pos: PostCreateResponse): Promise<VoteCreateResponse> => {
  const req: VoteCreateRequest = {
    claim: pos.id,
    kind: "stake",
    option: "true",
    value: edi.stake.split(" ")[0],
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
