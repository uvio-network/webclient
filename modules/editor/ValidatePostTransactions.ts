import * as CreateDispute from "@/modules/transaction/claims/write/CreateDispute";
import * as CreatePropose from "@/modules/transaction/claims/write/CreatePropose";
import * as TokenApprove from "@/modules/transaction/token/write/TokenApprove";

import { EditorStore } from "@/modules/editor/EditorStore";
import { EmptyPostCreateResponse } from "@/modules/api/post/create/Response";
import { WalletStore } from "@/modules/wallet/WalletStore";

export const ValidatePostTransactions = async () => {
  const edi = EditorStore.getState();
  const wal = WalletStore.getState();

  // We need to fake the claim ID if we are creating a claim from scratch,
  // because the post resource for our claim object has not yet been created
  // offchain. When we create the post object offchain, we will overwrite the
  // claim ID with the real value. Note that we may simulate transactions for
  // pending claims that we have to confirm onchain after some unknown failure.
  // In such a case the ID of the post object will be known already and we do
  // not have to overwrite it anymore.
  if (edi.post.id === "") {
    edi.updatePost(EmptyPostCreateResponse(ranNum(32).toString()));
  }

  {
    await TokenApprove.Simulate(
      wal.object.public(),
      wal.object.address(),
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
