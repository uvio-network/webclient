import * as TokenApprove from "@/modules/transaction/token/write/TokenApprove";
import * as UpdatePropose from "@/modules/transaction/claims/write/UpdatePropose";
import * as UpdateResolve from "@/modules/transaction/claims/write/UpdateResolve";

import { EditorStore } from "@/modules/editor/EditorStore";
import { SuccessReceipt } from "@/modules/wallet/WalletInterface";
import { Transaction } from "@/modules/transaction/Transaction";
import { WalletStore } from "@/modules/wallet/WalletStore";

export const ExecuteVoteTransactions = async (bef: () => void, aft: () => void) => {
  const edi = EditorStore.getState();
  const wal = WalletStore.getState();

  // In case a claim's first vote does either not exist or is pending, we must
  // not deposit onchain again, because the confirmed claim has already
  // deposited.
  if (edi.patch === true) {
    console.log("Editor.ExecuteVoteTransactions.patch", edi.patch);
    return;
  }

  // If a pending vote was confirmed onchain, and if we have the transaction
  // hash stored locally, then we do not have to execute another transaction.
  const hsh = edi.getVoteHash();

  const tra = hsh && hsh.transaction && hsh.transaction !== "" ? true : false;
  const use = hsh && hsh.userOp && hsh.userOp !== "" ? true : false;

  if (tra || use) {
    // If a transaction hash exists, then we do not call the underlying wallet
    // object to execute another transaction. That means we have to execute the
    // callbacks given to us manually before updating the receipt state. We do
    // this to guarantee any eventuell state changes in the user's view, because
    // some React component may rely on those callbacks being called properly
    // and in order.
    {
      bef();
      aft();
    }

    if (use && !tra) {
      hsh.transaction = await wal.object.getUserOpReceipt(hsh.userOp)
    }

    {
      EditorStore.getState().updateReceipt(SuccessReceipt(hsh));
      console.log("Editor.ExecuteVoteTransactions.exists", hsh);
    }

    return;
  }

  const txn: Transaction[] = [];

  if (edi.kind === "stake") {
    txn.push(TokenApprove.Encode(
      edi.getAmount().big,
      edi.claims.address,
      edi.getToken(),
    ));

    txn.push(UpdatePropose.Encode());
  }

  if (edi.kind === "truth") {
    txn.push(UpdateResolve.Encode());
  }

  {
    edi.updateReceipt(await wal.object.sendTransaction(txn, bef, aft));
  }
};
