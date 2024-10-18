import * as TokenApprove from "@/modules/transaction/token/write/TokenApprove";
import * as UpdatePropose from "@/modules/transaction/claims/write/UpdatePropose";
import * as UpdateResolve from "@/modules/transaction/claims/write/UpdateResolve";

import { EditorStore } from "@/modules/editor/EditorStore";
import { WalletStore } from "@/modules/wallet/WalletStore";
import { Transaction } from "@biconomy/account";

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

  const res = await wal.object.sendTransaction(txn, bef, aft);

  edi.updateReceipt(res);
};
