import * as ToastSender from "@/components/toast/ToastSender";
import * as UpdateResolve from "@/modules/transaction/claims/write/UpdateResolve";

import { ChainStore } from "@/modules/chain/ChainStore";
import { ContractWithAddress } from "@/modules/chain/ChainConfig";
import { EditorStore } from "@/components/app/claim/truth/editor/EditorStore";
import { EmptyReceipt } from "@/modules/wallet/WalletInterface";
import { EmptyVoteCreateResponse } from "@/modules/api/vote/create/Response";
import { TruthContext } from "@/modules/context/TruthContext";
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
  valid: (ctx: TruthContext) => void;
  error: (ctx: TruthContext) => void;
  offchain: (ctx: TruthContext) => void;
  onchain: (ctx: TruthContext) => void;
}

// SubmitForm validates user input and then performs the vote creation.
export const SubmitForm = async (props: Props) => {
  const chain = ChainStore.getState().getActive();
  const editor = EditorStore.getState();
  const user = UserStore.getState().user;
  const wallet = WalletStore.getState().wallet;

  let ctx: TruthContext = {
    after: props.after,
    auth: user.token,
    before: props.before,
    chain: chain.id.toString(),
    claim: {
      propose: editor.propose,
      resolve: editor.resolve,
    },
    claims: ContractWithAddress(editor.contract, chain),
    from: wallet.object.address(),
    option: editor.option,
    public: wallet.object.public(),
    receipt: EmptyReceipt(),
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
      ToastSender.Success("Heareth heareth, let there truth be told!");
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

const conCre = async (ctx: TruthContext, wal: WalletMessage): Promise<TruthContext> => {
  const txn = [
    UpdateResolve.Encode(ctx),
  ];

  try {
    ctx.receipt = await wal.object.sendTransaction(txn, ctx.before, ctx.after);
    return ctx;
  } catch (err) {
    console.error(err);
    ToastSender.Error(errMsg(err));
    return Promise.reject(err);
  }
};

const txnSim = async (ctx: TruthContext) => {
  try {
    await UpdateResolve.Simulate(ctx);
  } catch (err) {
    console.error(err);
    ToastSender.Error(errMsg(err));
    return Promise.reject(err);
  }
};

const votCre = async (ctx: TruthContext): Promise<TruthContext> => {
  const req: VoteCreateRequest = {
    claim: ctx.claim.resolve,
    hash: "",
    kind: "truth",
    lifecycle: "onchain",
    meta: "",
    option: String(ctx.option),
    value: "1",
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

const votDel = async (ctx: TruthContext) => {
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

const votUpd = async (ctx: TruthContext) => {
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
