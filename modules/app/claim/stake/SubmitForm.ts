import * as ToastSender from "@/components/toast/ToastSender";

import { ChainStore } from "@/modules/chain/ChainStore";
import { EditorMessage } from "@/components/app/claim/stake/editor/EditorStore";
import { EditorStore } from "@/components/app/claim/stake/editor/EditorStore";
import { EmptyVoteCreateResponse } from "@/modules/api/vote/create/Response";
import { StakeContext } from "@/modules/context/StakeContext";
import { UserStore } from "@/modules/user/UserStore";
import { VoteCreate } from "@/modules/api/vote/create/Create";
import { VoteCreateRequest } from "@/modules/api/vote/create/Request";
import { WalletMessage } from "@/modules/wallet/WalletStore";
import { WalletStore } from "@/modules/wallet/WalletStore";
import { MarketsStake } from "@/modules/transaction/MarketsStake";

// SubmitForm validates user input and then performs the vote creation.
export const SubmitForm = async (suc: (vot: string) => void) => {
  const chain = ChainStore.getState().getActive();
  const user = UserStore.getState().user;
  const editor = EditorStore.getState();
  const wallet = WalletStore.getState().wallet;

  {
    if (!editor.value || editor.value === "") {
      return ToastSender.Error("The staking value must not be empty.");
    }
    if (!inpNum(editor.value)) {
      return ToastSender.Error("The amount of staked reputation must be a positive number.");
    }
    if (parseFloat(editor.value) < editor.minimum) {
      return ToastSender.Error(`You must stake at least the minimum amount of ${editor.minimum} ${editor.token}.`);
    }
  }

  {
    ToastSender.Info("Alrighty pumpkin, let's see if you got all the marbles.");
  }

  let ctx: StakeContext = {
    amount: parseFloat(editor.value),
    auth: user.token,
    chain: chain.id.toString(),
    claim: editor.claim,
    hash: "", // filled on the fly
    token: chain.tokens[editor.token],
    vote: EmptyVoteCreateResponse(),
  };

  {
    ctx = await chnCre(ctx, wallet);
    ctx = await votCre(ctx, editor);
  }

  {
    ToastSender.Success("Certified, you staked the shit out of that reputation!");
    editor.delete();
    suc(ctx.vote.id);
  }

  // TODO prevent duplicated submits
};

const regex = /^\d+(\.\d+)?/;

// inpNum returns true if the given input string has a numerical prefix. This
// prefix might be an integer or floating point number.
//
//     5
//     0.003
//
const inpNum = (inp: string): boolean => {
  if (!inp || inp === "") return false;
  return regex.test(inp);
};

const chnCre = async (ctx: StakeContext, wal: WalletMessage): Promise<StakeContext> => {
  try {
    const res = await MarketsStake(ctx, wal);
    return res;
  } catch (err) {
    console.error(err);
    ToastSender.Error(err instanceof Error ? err.message : String(err));
    return Promise.reject(err);
  }
}

const votCre = async (ctx: StakeContext, edi: EditorMessage): Promise<StakeContext> => {
  const req: VoteCreateRequest = {
    chain: ctx.chain,
    claim: ctx.claim,
    hash: ctx.hash,
    kind: "stake",
    lifecycle: "onchain",
    meta: "",
    option: edi.option,
    value: edi.value,
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
