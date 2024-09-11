import * as ToastSender from "@/components/toast/ToastSender";

import { ChainStore } from "@/modules/chain/ChainStore";
import { EditorStore } from "@/components/app/claim/stake/editor/EditorStore";
import { EmptyVoteCreateResponse } from "@/modules/api/vote/create/Response";
import { parseUnits } from "viem";
import { SendTransaction } from "@/modules/transaction/SendTransaction";
import { StakeContext } from "@/modules/context/StakeContext";
import { TokenApprove } from "@/modules/transaction/token/write/TokenApprove";
import { TokenMessage } from "@/modules/token/TokenStore";
import { TokenStore } from "@/modules/token/TokenStore";
import { UpdatePropose } from "@/modules/transaction/claims/write/UpdatePropose";
import { UserStore } from "@/modules/user/UserStore";
import { VoteCreate } from "@/modules/api/vote/create/Create";
import { VoteCreateRequest } from "@/modules/api/vote/create/Request";
import { VoteUpdate } from "@/modules/api/vote/update/Update";
import { VoteUpdateRequest } from "@/modules/api/vote/update/Request";
import { WalletMessage } from "@/modules/wallet/WalletStore";
import { WalletStore } from "@/modules/wallet/WalletStore";

// SubmitForm validates user input and then performs the vote creation.
export const SubmitForm = async (err: (ctx: StakeContext) => void, off: (ctx: StakeContext) => void, onc: (ctx: StakeContext) => void) => {
  const chain = ChainStore.getState().getActive();
  const editor = EditorStore.getState();
  const token = TokenStore.getState().available;
  const user = UserStore.getState().user;
  const wallet = WalletStore.getState().wallet;

  {
    if (!editor.value || editor.value === "") {
      return ToastSender.Error("The staking value must not be empty.");
    }
    if (!inpNum(editor.value)) {
      return ToastSender.Error("The staking value must be a positive number without token symbol.");
    }
    if (parseFloat(editor.value) < editor.minimum) {
      return ToastSender.Error(`You must stake at least the minimum amount of ${editor.minimum} ${editor.token}.`);
    }
    if (!inpBal(editor.value, editor.token, token)) {
      return ToastSender.Error(`You do not seem to have enough tokens to stake ${editor.value} ${editor.token}.`);
    }
  }

  let ctx: StakeContext = {
    amount: {
      num: parseFloat(editor.value),
      big: parseUnits(String(parseFloat(editor.value)), chain.tokens[editor.token].decimals),
    },
    auth: user.token,
    chain: chain.id.toString(),
    claim: editor.claim,
    claims: chain.contracts["Claims-" + editor.token],
    hash: "", // filled on the fly
    option: editor.option,
    success: false,
    symbol: editor.token,
    token: chain.tokens[editor.token],
    vote: EmptyVoteCreateResponse(),
  };

  {
    ctx = await votCre(ctx);
  }

  {
    ToastSender.Success("Certified, you staked the shit out of that claim!");
    editor.delete();
    off(ctx);
  }

  {
    ctx = await conCre(ctx, wallet);
  }

  if (ctx.success === true) {
    await votUpd(ctx);
    onc(ctx);
  } else {
    ToastSender.Success("Ohh, nope, that was not good enough!");
    err(ctx);
  }

  // TODO prevent duplicated submits
};

const inpBal = (num: string, sym: string, tok: TokenMessage): boolean => {
  const des = parseFloat(num);
  const cur = tok[sym]?.balance || 0;

  return cur >= des;
};

// inpNum returns true if the given input number is valid and greater than zero.
//
//     5
//     0.003
//
const inpNum = (str: string): boolean => {
  return !isNaN(Number(str)) && parseFloat(str) > 0;
};

const conCre = async (ctx: StakeContext, wal: WalletMessage): Promise<StakeContext> => {
  const txn = [
    TokenApprove(ctx.amount.big, ctx.claims, ctx.token),
    UpdatePropose(ctx, ctx.claims),
  ];

  try {
    const { hash, success } = await SendTransaction(wal, txn);
    ctx.hash = hash;
    ctx.success = success;
    return ctx;
  } catch (err) {
    console.error(err);
    ToastSender.Error(err instanceof Error ? err.message : String(err));
    return Promise.reject(err);
  }
}

const votCre = async (ctx: StakeContext): Promise<StakeContext> => {
  const req: VoteCreateRequest = {
    chain: ctx.chain,
    claim: ctx.claim,
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
}

const votUpd = async (ctx: StakeContext) => {
  const req: VoteUpdateRequest = {
    // intern
    id: ctx.vote.id,
    // public
    hash: ctx.hash,
    meta: "",
  };

  try {
    const [res] = await VoteUpdate(ctx.auth, [req]);
  } catch (err) {
    console.error(err);
    ToastSender.Error(err instanceof Error ? err.message : String(err));
    return Promise.reject(err);
  }
}
