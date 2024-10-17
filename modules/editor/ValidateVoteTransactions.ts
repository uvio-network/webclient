import * as TokenApprove from "@/modules/transaction/token/write/TokenApprove";
import * as UpdatePropose from "@/modules/transaction/claims/write/UpdatePropose";
import * as UpdateResolve from "@/modules/transaction/claims/write/UpdateResolve";

import { EditorStore } from "@/modules/editor/EditorStore";
import { WalletStore } from "@/modules/wallet/WalletStore";

export const ValidateVoteTransactions = async () => {
  const edi = EditorStore.getState();
  const wal = WalletStore.getState();

  if (edi.kind === "stake") {
    await TokenApprove.Simulate(
      wal.wallet.object.public(),
      wal.wallet.object.address(),
      edi.getAmount().big,
      edi.claims.address,
      edi.getToken(),
    );

    await UpdatePropose.Simulate();
  }

  if (edi.kind === "truth") {
    await UpdateResolve.Simulate();
  }
};
