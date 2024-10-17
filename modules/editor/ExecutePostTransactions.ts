import * as CreateDispute from "@/modules/transaction/claims/write/CreateDispute";
import * as CreatePropose from "@/modules/transaction/claims/write/CreatePropose";
import * as TokenApprove from "@/modules/transaction/token/write/TokenApprove";

import { EditorStore } from "@/modules/editor/EditorStore";
import { WalletStore } from "@/modules/wallet/WalletStore";

export const ExecutePostTransactions = async (bef: () => void, aft: () => void) => {
  const edi = EditorStore.getState();
  const wal = WalletStore.getState();

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

  edi.updateReceipt(res);
};
