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

  if (edi.resolve !== undefined) {
    txn.push(CreateDispute.Encode());
  } else {
    txn.push(CreatePropose.Encode());
  }

  const res = await wal.wallet.object.sendTransaction(txn, bef, aft);

  edi.updateReceipt(res);
};
