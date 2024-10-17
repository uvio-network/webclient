import * as TokenApprove from "@/modules/transaction/token/write/TokenApprove";
import * as UpdatePropose from "@/modules/transaction/claims/write/UpdatePropose";
import * as UpdateResolve from "@/modules/transaction/claims/write/UpdateResolve";

import { EditorStore } from "@/modules/editor/EditorStore";
import { WalletStore } from "@/modules/wallet/WalletStore";
import { Transaction } from "@biconomy/account";

export const ExecuteVoteTransactions = async (bef: () => void, aft: () => void) => {
  const edi = EditorStore.getState();
  const wal = WalletStore.getState();

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

  const res = await wal.wallet.object.sendTransaction(txn, bef, aft);

  edi.updateReceipt(res);
};
