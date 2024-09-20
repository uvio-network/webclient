import moment from "moment";

import * as CreatePropose from "@/modules/transaction/claims/write/CreatePropose";
import * as ToastSender from "@/components/toast/ToastSender";
import * as TokenApprove from "@/modules/transaction/token/write/TokenApprove";

import { ChainStore } from "@/modules/chain/ChainStore";
import { EditorMessage } from "@/components/app/claim/propose/editor/EditorStore";
import { EditorStore } from "@/components/app/claim/propose/editor/EditorStore";
import { EmptyReceipt } from "@/modules/wallet/WalletInterface";
import { EmptyPostCreateResponse } from "@/modules/api/post/create/Response";
import { EmptyVoteCreateResponse } from "@/modules/api/vote/create/Response";
import { HasDuplicate } from "@/modules/string/HasDuplicate";
import { parseUnits } from "viem";
import { PostCreate } from "@/modules/api/post/create/Create";
import { PostCreateRequest } from "@/modules/api/post/create/Request";
import { PostDelete } from "@/modules/api/post/delete/Delete";
import { PostDeleteRequest } from "@/modules/api/post/delete/Request";
import { PostUpdate } from "@/modules/api/post/update/Update";
import { PostUpdateRequest } from "@/modules/api/post/update/Request";
import { ProposeContext } from "@/modules/context/ProposeContext";
import { SplitList } from "@/modules/string/SplitList";
import { TokenMessage } from "@/modules/token/TokenStore";
import { TokenStore } from "@/modules/token/TokenStore";
import { Unix } from "@/modules/time/Time";
import { UserStore } from "@/modules/user/UserStore";
import { VoteCreate } from "@/modules/api/vote/create/Create";
import { VoteCreateRequest } from "@/modules/api/vote/create/Request";
import { VoteDelete } from "@/modules/api/vote/delete/Delete";
import { VoteDeleteRequest } from "@/modules/api/vote/delete/Request";
import { VoteUpdate } from "@/modules/api/vote/update/Update";
import { VoteUpdateRequest } from "@/modules/api/vote/update/Request";
import { WalletMessage } from "@/modules/wallet/WalletStore";
import { WalletStore } from "@/modules/wallet/WalletStore";

// SubmitForm validates user input and then performs the claim creation.
export const SubmitForm = async (err: (ctx: ProposeContext) => void, off: (ctx: ProposeContext) => void, onc: (ctx: ProposeContext) => void, rej: (ctx: ProposeContext) => void) => {
  const chain = ChainStore.getState().getActive();
  const editor = EditorStore.getState();
  const token = TokenStore.getState().available;
  const user = UserStore.getState().user;
  const wallet = WalletStore.getState().wallet;

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
    const uni: number = newExp(editor)

    if (!editor.day || editor.day === "") {
      return ToastSender.Error("You must select a day for the claim expiry.");
    }
    if (!editor.month || editor.month === "") {
      return ToastSender.Error("You must select a month for the claim expiry.");
    }
    if (!editor.year || editor.year === "") {
      return ToastSender.Error("You must select a year for the claim expiry.");
    }
    if (moment.unix(uni).isBefore(moment().utc())) {
      return ToastSender.Error("The selected expiry must not be in past.");
    }
    if (moment.unix(uni).isBefore(moment().utc().add(1, "day"))) {
      return ToastSender.Error("The selected expiry must be at least 1 day in the future.");
    }
  }

  {
    const num = editor.getAmount();
    const sym = editor.getToken();
    const lis = Object.keys(chain.tokens);

    if (num === 0 || sym === "") {
      return ToastSender.Error("Your staked reputation must be in the format [number token].");
    }
    if (num === 0) {
      return ToastSender.Error("You must stake reputation with your claim.");
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

  let ctx: ProposeContext = {
    amount: {
      num: editor.getAmount(),
      big: parseUnits(String(editor.getAmount()), chain.tokens[editor.getToken()].decimals),
    },
    auth: user.token,
    chain: chain.id.toString(),
    claims: chain.contracts["Claims-" + editor.getToken()],
    expiry: newExp(editor),
    from: wallet.object.address(),
    labels: SplitList(editor.labels).join(","),
    markdown: editor.markdown,
    option: true, // hardcoded for now
    post: EmptyPostCreateResponse(),
    public: wallet.object.public(),
    receipt: EmptyReceipt(),
    reference: await newHsh(editor.markdown),
    symbol: editor.getToken(),
    token: chain.tokens[editor.getToken()],
    vote: EmptyVoteCreateResponse(),
  };

  // Before we create any resources, whether it is offchain or onchain, we
  // create the required transactions and simulate them to the best of our
  // abilities. If we cannot even simulate transactions, we have no business
  // creating any resources on behalf of the user.
  {
    await txnSim(ctx);
  }

  {
    ctx = await posCre(ctx);
    ctx = await votCre(ctx);
  }

  {
    ToastSender.Success("Hooray, thy claim proposed milady!");
    off(ctx);
  }

  {
    ctx = await conCre(ctx, wallet);
  }

  if (ctx.receipt.success === true) {
    await posUpd(ctx);
    await votUpd(ctx);
    editor.delete();
    onc(ctx);
  } else if (ctx.receipt.rejected === true) {
    ToastSender.Info("No biggie darling, we'll take it back!");
    // The vote object must be deleted first, because it requires the post
    // object to exist in the backend in order to be deleted.
    await votDel(ctx);
    await posDel(ctx);
    rej(ctx);
  } else {
    ToastSender.Error("Ohh, nope, that was not good enough!");
    err(ctx);
  }

  // TODO prevent duplicated submits
};

const inpBal = (num: number, sym: string, tok: TokenMessage): boolean => {
  const des = num;
  const cur = tok[sym]?.balance || 0;

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

// inpNum returns true if the given input number is valid and greater than zero.
//
//     5
//     0.003
//
const inpNum = (num: number): boolean => {
  return !isNaN(num) && num > 0;
};

// inpSym returns true if the given input string has one of the whitelisted
// tokens as suffixe.
const inpSym = (sym: string, lis: string[]): boolean => {
  if (sym === "") return false;
  return lis.some((x) => x === sym);
};

const newExp = (edi: EditorMessage): number => {
  return Unix(`${edi.day} ${edi.month} ${edi.year}`);
};

const ranNum = (len: number): BigInt => {
  const min = BigInt(10 ** (len - 1));
  const max = BigInt(10 ** len - 1);
  return BigInt(Math.floor(Math.random() * Number(max - min + BigInt(1))) + Number(min));
};

const newHsh = async (str: string): Promise<string> => {
  const enc = new TextEncoder().encode(str);
  const buf = await window.crypto.subtle.digest("SHA-256", enc);
  const unt = Array.from(new Uint8Array(buf));
  const hsh = unt.map((b) => b.toString(16).padStart(2, "0")).join("");

  return hsh;
};

const conCre = async (ctx: ProposeContext, wal: WalletMessage): Promise<ProposeContext> => {
  const txn = [
    TokenApprove.Encode(ctx.amount.big, ctx.claims.address, ctx.token),
    CreatePropose.Encode(ctx),
  ];

  try {
    const res = await wal.object.sendTransaction(txn);
    ctx.receipt = res;
    return ctx;
  } catch (err) {
    console.error(err);
    ToastSender.Error(err instanceof Error ? err.message : String(err));
    return Promise.reject(err);
  }
};

const posCre = async (ctx: ProposeContext): Promise<ProposeContext> => {
  const req: PostCreateRequest = {
    chain: ctx.chain,
    contract: ctx.claims.address,
    hash: "",
    expiry: ctx.expiry.toString(),
    kind: "claim",
    labels: ctx.labels,
    lifecycle: "propose",
    meta: "",
    parent: "",
    text: ctx.markdown,
    token: ctx.symbol,
  };

  try {
    const [res] = await PostCreate(ctx.auth, [req]);
    ctx.post = res;
    return ctx;
  } catch (err) {
    console.error(err);
    ToastSender.Error(err instanceof Error ? err.message : String(err));
    return Promise.reject(err);
  }
};

const posDel = async (ctx: ProposeContext) => {
  const req: PostDeleteRequest = {
    // intern
    id: ctx.post.id,
  };

  try {
    const [res] = await PostDelete(ctx.auth, [req]);
  } catch (err) {
    console.error(err);
    ToastSender.Error(err instanceof Error ? err.message : String(err));
    return Promise.reject(err);
  }
}

const posUpd = async (ctx: ProposeContext) => {
  const req: PostUpdateRequest = {
    // intern
    id: ctx.post.id,
    // public
    hash: ctx.receipt.hash,
    meta: "",
  };

  try {
    const [res] = await PostUpdate(ctx.auth, [req]);
  } catch (err) {
    console.error(err);
    ToastSender.Error(err instanceof Error ? err.message : String(err));
    return Promise.reject(err);
  }
};

const txnSim = async (ctx: ProposeContext) => {
  // Since we are trying to create a claim, and since we are trying to simulate
  // the contract write for exactly that objective, we need to fake the claim ID
  // for the simulation step because the post resource for our claim object has
  // not yet been created. When we create the post object offchain, we will
  // overwrite the claim ID with the real value.
  {
    ctx.post.id = ranNum(32).toString();
  }

  try {
    await TokenApprove.Simulate(ctx.public, ctx.from, ctx.amount.big, ctx.claims.address, ctx.token);
    await CreatePropose.Simulate(ctx);
  } catch (err) {
    console.error(err);
    ToastSender.Error(err instanceof Error ? err.message : String(err));
    return Promise.reject(err);
  }
};

const votCre = async (ctx: ProposeContext): Promise<ProposeContext> => {
  const req: VoteCreateRequest = {
    chain: ctx.chain,
    claim: ctx.post.id,
    hash: "",
    kind: "stake",
    lifecycle: "onchain",
    meta: "",
    option: String(ctx.option),
    value: ctx.amount.num.toString(),
  };

  try {
    const [res] = await VoteCreate(ctx.auth, [req]);
    ctx.vote = res;
    return ctx;
  } catch (err) {
    console.error(err);
    ToastSender.Error(err instanceof Error ? err.message : String(err));
    return Promise.reject(err);
  }
};

const votDel = async (ctx: ProposeContext) => {
  const req: VoteDeleteRequest = {
    // intern
    id: ctx.vote.id,
  };

  try {
    const [res] = await VoteDelete(ctx.auth, [req]);
  } catch (err) {
    console.error(err);
    ToastSender.Error(err instanceof Error ? err.message : String(err));
    return Promise.reject(err);
  }
}

const votUpd = async (ctx: ProposeContext) => {
  const req: VoteUpdateRequest = {
    // intern
    id: ctx.vote.id,
    // public
    hash: ctx.receipt.hash,
    meta: "",
  };

  try {
    const [res] = await VoteUpdate(ctx.auth, [req]);
  } catch (err) {
    console.error(err);
    ToastSender.Error(err instanceof Error ? err.message : String(err));
    return Promise.reject(err);
  }
};
