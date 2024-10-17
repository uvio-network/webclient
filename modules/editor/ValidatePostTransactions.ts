import * as CreateDispute from "@/modules/transaction/claims/write/CreateDispute";
import * as CreatePropose from "@/modules/transaction/claims/write/CreatePropose";
import * as TokenApprove from "@/modules/transaction/token/write/TokenApprove";

import { EditorStore } from "@/modules/editor/EditorStore";
import { EmptyPostCreateResponse } from "@/modules/api/post/create/Response";
import { WalletStore } from "@/modules/wallet/WalletStore";

export const ValidatePostTransactions = async () => {
  const edi = EditorStore.getState();
  const wal = WalletStore.getState();

  // We need to fake the claim ID temporarily in order to make the transaction
  // simulation work. Below we remove the fake again once we know our
  // transactions are validated.
  if (edi.post === undefined || edi.post.id === "") {
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

  // Reset the fake claim ID.
  {
    edi.updatePost(EmptyPostCreateResponse());
  }
};

const ranNum = (len: number): BigInt => {
  const min = BigInt(10 ** (len - 1));
  const max = BigInt(10 ** len - 1);
  return BigInt(Math.floor(Math.random() * Number(max - min + BigInt(1))) + Number(min));
};