import * as ToastSender from "@/components/toast/ToastSender";
import * as TokenApprove from "@/modules/transaction/token/write/TokenApprove";
import * as UpdatePropose from "@/modules/transaction/claims/write/UpdatePropose";

import { ChainStore } from "@/modules/chain/ChainStore";
import { ContractWithAddress } from "@/modules/chain/ChainConfig";
import { EditorStore } from "@/components/app/claim/stake/editor/EditorStore";
import { EmptyReceipt } from "@/modules/wallet/WalletInterface";
import { EmptyVoteCreateResponse } from "@/modules/api/vote/create/Response";
import { parseUnits } from "viem";
import { StakeContext } from "@/modules/context/StakeContext";
import { TokenMessage } from "@/modules/token/TokenStore";
import { TokenStore } from "@/modules/token/TokenStore";
import { UserStore } from "@/modules/user/UserStore";
import { VoteCreate } from "@/modules/api/vote/create/Create";
import { VoteCreateRequest } from "@/modules/api/vote/create/Request";
import { VoteDelete } from "@/modules/api/vote/delete/Delete";
import { VoteDeleteRequest } from "@/modules/api/vote/delete/Request";
import { VoteUpdate } from "@/modules/api/vote/update/Update";
import { VoteUpdateRequest } from "@/modules/api/vote/update/Request";
import { WalletMessage } from "@/modules/wallet/WalletStore";
import { WalletStore } from "@/modules/wallet/WalletStore";

interface Props {
  before: () => void;
  after: () => void;
  valid: (ctx: StakeContext) => void;
  error: (ctx: StakeContext) => void;
  offchain: (ctx: StakeContext) => void;
  onchain: (ctx: StakeContext) => void;
}

// SubmitForm validates user input and then performs the vote creation.
export const SubmitForm = async (props: Props) => {
  const chain = ChainStore.getState().getActive();
  const editor = EditorStore.getState();
  const token = TokenStore.getState().available;
  const user = UserStore.getState().user;
  const wallet = WalletStore.getState().wallet;

  // Remove the token suffix if the user added it.
  if (editor.value) {
    editor.value = editor.value.replace(" " + editor.token, "");
  }

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
    after: props.after,
    amount: {
      num: parseFloat(editor.value),
      big: parseUnits(String(parseFloat(editor.value)), chain.tokens[editor.token].decimals),
    },
    auth: user.token,
    before: props.before,
    chain: chain.id.toString(),
    claim: editor.claim,
    claims: ContractWithAddress(editor.contract, chain),
    from: wallet.object.address(),
    option: editor.option,
    public: wallet.object.public(),
    receipt: EmptyReceipt(),
    symbol: editor.token,
    token: chain.tokens[editor.token],
    vote: EmptyVoteCreateResponse(),
  };

  try {
    // Before we create any resources, whether it is offchain or onchain, we
    // create the required transactions and simulate them to the best of our
    // abilities. If we cannot even simulate transactions, we have no business
    // creating any resources on behalf of the user.
    {
      await txnSim(ctx);
    }

    {
      props.valid(ctx);
    }

    {
      ctx = await votCre(ctx);
    }

    {
      props.offchain(ctx);
    }

    {
      ctx = await conCre(ctx, wallet);
    }

    if (ctx.receipt.success === true) {
      await votUpd(ctx);
      ToastSender.Success("Certified, you staked the shit out of that claim!");
      editor.delete();
      props.onchain(ctx);
    } else if (ctx.receipt.rejected === true) {
      ToastSender.Info("No biggie darling, we'll take it back.");
      await votDel(ctx);
      props.error(ctx);
    } else {
      ToastSender.Error("Ohh, nope, that was not good enough!");
      props.error(ctx);
    }
  } catch (err) {
    props.error(ctx);
  }
};

const errMsg = (err: any): string => {
  if (err instanceof Error) {
    if (err.message.includes(".")) {
      return err.message.split(".")[0] + ".";
    }

    return err.message;
  }

  return String(err);
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
    TokenApprove.Encode(ctx.amount.big, ctx.claims.address, ctx.token),
    UpdatePropose.Encode(ctx),
  ];

  try {
    const res = await wal.object.sendTransaction(txn, ctx.before, ctx.after);
    ctx.receipt = res;
    return ctx;
  } catch (err) {
    console.error(err);
    ToastSender.Error(errMsg(err));
    return Promise.reject(err);
  }
}

const txnSim = async (ctx: StakeContext) => {
  try {
    await TokenApprove.Simulate(ctx.public, ctx.from, ctx.amount.big, ctx.claims.address, ctx.token);
    await UpdatePropose.Simulate(ctx);
  } catch (err) {
    console.error(err);
    ToastSender.Error(errMsg(err));
    return Promise.reject(err);
  }
};

const votCre = async (ctx: StakeContext): Promise<StakeContext> => {
  const req: VoteCreateRequest = {
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
    ToastSender.Error(errMsg(err));
    return Promise.reject(err);
  }
}

const votDel = async (ctx: StakeContext) => {
  const req: VoteDeleteRequest = {
    // intern
    id: ctx.vote.id,
  };

  try {
    const [res] = await VoteDelete(ctx.auth, [req]);
  } catch (err) {
    console.error(err);
    ToastSender.Error(errMsg(err));
    return Promise.reject(err);
  }
}

const votUpd = async (ctx: StakeContext) => {
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
    ToastSender.Error(errMsg(err));
    return Promise.reject(err);
  }
}
