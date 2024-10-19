import * as CreateDispute from "@/modules/transaction/claims/write/CreateDispute";
import * as CreatePropose from "@/modules/transaction/claims/write/CreatePropose";
import * as TokenApprove from "@/modules/transaction/token/write/TokenApprove";

import { EditorStore } from "@/modules/editor/EditorStore";
import { SuccessReceipt } from "@/modules/wallet/WalletInterface";
import { WalletStore } from "@/modules/wallet/WalletStore";

export const ExecutePostTransactions = async (bef: () => void, aft: () => void) => {
  const edi = EditorStore.getState();
  const wal = WalletStore.getState();

  // If a pending claim was confirmed onchain, and if we have the transaction
  // hash stored locally, then we do not have to execute another transaction.
  const hsh = edi.getPostHash();
  if (hsh !== "") {
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

    {
      EditorStore.getState().updateReceipt(SuccessReceipt(hsh));
      console.log("Editor.ExecutePostTransactions.exists", hsh);
    }

    return;
  }

  const txn = [
    TokenApprove.Encode(
      edi.getAmount().big,
      edi.claims.address,
      edi.getToken(),
    ),
  ];

  if (edi.isPropose()) {
    txn.push(CreatePropose.Encode());
  }

  if (edi.isDispute()) {
    txn.push(CreateDispute.Encode());
  }

  const res = await wal.object.sendTransaction(txn, bef, aft);

  {
    edi.updateReceipt(res);
  }
};
