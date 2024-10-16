import * as CreateDispute from "@/modules/transaction/claims/write/CreateDispute";
import * as CreatePropose from "@/modules/transaction/claims/write/CreatePropose";
import * as TokenApprove from "@/modules/transaction/token/write/TokenApprove";

import { EditorStore } from "@/modules/editor/EditorStore";
import { EmptyPostCreateResponse } from "@/modules/api/post/create/Response";
import { WalletStore } from "@/modules/wallet/WalletStore";

export const ValidateTransactions = async () => {
  const edi = EditorStore.getState();
  const wal = WalletStore.getState();

  // Since we are trying to create a claim, and since we are trying to simulate
  // the contract write for exactly that objective, we need to fake the claim ID
  // for the simulation step because the post resource for our claim object has
  // not yet been created offchain. When we create the post object offchain, we
  // will overwrite the claim ID with the real value.
  {
    edi.updatePost(EmptyPostCreateResponse(ranNum(32).toString()));
  }

  {
    await TokenApprove.Simulate(
      wal.wallet.object.public(),
      wal.wallet.object.address(),
      edi.getAmount().big,
      edi.claims.address,
      edi.getToken(),
    );
  }

  if (edi.resolve !== undefined) {
    await CreateDispute.Simulate();
  } else {
    await CreatePropose.Simulate();
  }
};

const ranNum = (len: number): BigInt => {
  const min = BigInt(10 ** (len - 1));
  const max = BigInt(10 ** len - 1);
  return BigInt(Math.floor(Math.random() * Number(max - min + BigInt(1))) + Number(min));
};
