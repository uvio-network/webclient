import moment from "moment";

import * as CreateDispute from "@/modules/transaction/claims/write/CreateDispute";
import * as ToastSender from "@/components/toast/ToastSender";
import * as TokenApprove from "@/modules/transaction/token/write/TokenApprove";

import { ChainStore } from "@/modules/chain/ChainStore";
import { ClaimsWithSymbol } from "@/modules/chain/ChainConfig";
import { EditorMessage } from "@/components/app/claim/dispute/editor/EditorStore";
import { EditorStore } from "@/components/app/claim/dispute/editor/EditorStore";
import { EmptyReceipt } from "@/modules/wallet/WalletInterface";
import { EmptyPostCreateResponse } from "@/modules/api/post/create/Response";
import { EmptyVoteCreateResponse } from "@/modules/api/vote/create/Response";
import { parseUnits } from "viem";
import { PostCreate } from "@/modules/api/post/create/Create";
import { PostCreateRequest } from "@/modules/api/post/create/Request";
import { PostDelete } from "@/modules/api/post/delete/Delete";
import { PostDeleteRequest } from "@/modules/api/post/delete/Request";
import { PostUpdate } from "@/modules/api/post/update/Update";
import { PostUpdateRequest } from "@/modules/api/post/update/Request";
import { DisputeContext } from "@/modules/context/DisputeContext";
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
export const SubmitForm = async (err: (ctx: DisputeContext) => void, off: (ctx: DisputeContext) => void, onc: (ctx: DisputeContext) => void, rej: (ctx: DisputeContext) => void) => {
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
    if (editor.markdown.length < 20) {
      return ToastSender.Error("The provided markdown must at least have 20 characters.");
    }
    if (editor.markdown.length > 5000) {
      return ToastSender.Error("The provided markdown must not be longer than 5000 characters.");
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
    if (moment.unix(uni).isBefore(moment().utc().add(3, "day"))) {
      return ToastSender.Error("The selected expiry must be at least 3 days in the future.");
    }
    if (moment.unix(uni).isAfter(moment().utc().add(30, "day"))) {
      // TODO if the user selects the max expiry then we need to adjust for
      // latency and remove a couple of seconds for the onchain settlement to be
      // buffered.
      return ToastSender.Error("The selected expiry must be within the next 30 days.");
    }
  }

  {
    const num = editor.amount;
    const sym = editor.token;

    if (num === 0) {
      return ToastSender.Error("You must stake reputation with your claim.");
    }
    if (!inpNum(num)) {
      return ToastSender.Error("The amount of your stake must be a positive number.");
    }
    if (!inpBal(num, sym, token)) {
      return ToastSender.Error(`You do not seem to have enough tokens to stake ${num} ${sym}.`);
    }
  }

  let ctx: DisputeContext = {
    after: () => { },
    amount: {
      num: editor.amount,
      big: parseUnits(String(editor.amount), chain.tokens[editor.token].decimals),
    },
    auth: user.token,
    before: () => { },
    chain: chain.id.toString(),
    claims: ClaimsWithSymbol(editor.token, chain),
    expiry: newExp(editor),
    from: wallet.object.address(),
    labels: editor.labels,
    markdown: editor.markdown,
    option: editor.option,
    post: EmptyPostCreateResponse(),
    propose: editor.propose,
    public: wallet.object.public(),
    receipt: EmptyReceipt(),
    reference: await newHsh(editor.markdown),
    resolve: editor.resolve,
    symbol: editor.token,
    token: chain.tokens[editor.token],
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
    ToastSender.Processing("Waiting for onchain confirmation.");
    off(ctx);
  }

  {
    ctx = await conCre(ctx, wallet);
  }

  if (ctx.receipt.success === true) {
    await posUpd(ctx);
    await votUpd(ctx);
    ToastSender.Success("That's a dispute for the history books!", true);
    editor.delete();
    onc(ctx);
  } else if (ctx.receipt.rejected === true) {
    ToastSender.Info("No biggie darling, we'll take it back.", true);
    // The vote object must be deleted first, because it requires the post
    // object to exist in the backend in order to be deleted.
    await votDel(ctx);
    await posDel(ctx);
    rej(ctx);
  } else {
    ToastSender.Error("Ohh, nope, that was not good enough!", true);
    err(ctx);
  }

  // TODO prevent duplicated submits
};

const inpBal = (num: number, sym: string, tok: TokenMessage): boolean => {
  const des = num;
  const cur = tok[sym]?.balance || 0;

  return cur >= des;
};

// inpNum returns true if the given input number is valid and greater than zero.
//
//     5
//     0.003
//
const inpNum = (num: number): boolean => {
  return !isNaN(num) && num > 0;
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

const conCre = async (ctx: DisputeContext, wal: WalletMessage): Promise<DisputeContext> => {
  const txn = [
    TokenApprove.Encode(ctx.amount.big, ctx.claims.address, ctx.token),
    CreateDispute.Encode(ctx),
  ];

  try {
    const res = await wal.object.sendTransaction(txn, ctx.before, ctx.after);
    ctx.receipt = res;
    return ctx;
  } catch (err) {
    console.error(err);
    ToastSender.Error(err instanceof Error ? err.message : String(err));
    return Promise.reject(err);
  }
};

const posCre = async (ctx: DisputeContext): Promise<DisputeContext> => {
  const req: PostCreateRequest = {
    chain: ctx.chain,
    contract: ctx.claims.address,
    hash: "",
    expiry: ctx.expiry.toString(),
    kind: "claim",
    labels: ctx.labels,
    lifecycle: "dispute",
    meta: "",
    parent: ctx.resolve,
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

const posDel = async (ctx: DisputeContext) => {
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

const posUpd = async (ctx: DisputeContext) => {
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

const txnSim = async (ctx: DisputeContext) => {
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
    await CreateDispute.Simulate(ctx);
  } catch (err) {
    console.error(err);
    ToastSender.Error(err instanceof Error ? err.message : String(err));
    return Promise.reject(err);
  }
};

const votCre = async (ctx: DisputeContext): Promise<DisputeContext> => {
  const req: VoteCreateRequest = {
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

const votDel = async (ctx: DisputeContext) => {
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

const votUpd = async (ctx: DisputeContext) => {
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
