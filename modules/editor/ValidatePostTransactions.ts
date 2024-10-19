import * as CreateDispute from "@/modules/transaction/claims/write/CreateDispute";
import * as CreatePropose from "@/modules/transaction/claims/write/CreatePropose";
import * as TokenApprove from "@/modules/transaction/token/write/TokenApprove";

import { EditorStore } from "@/modules/editor/EditorStore";
import { EmptyPostCreateResponse } from "@/modules/api/post/create/Response";
import { WalletStore } from "@/modules/wallet/WalletStore";

export const ValidatePostTransactions = async () => {
  const edi = EditorStore.getState();
  const wal = WalletStore.getState();

  // It may happen that a pending claim has to be updated, for which we have the
  // transaction hash in local storage. If we have this transaction hash for
  // this claim, then we cannot simulate the transaction again, because the
  // claim's ID is then already allocated onchain. If we were to continue below
  // desspite the fact of that claim ID being taken, the simulation below would
  // fail and the user would get stuck. We can safely return here, because the
  // transaction got already confirmed onchain, meaning it was already simulated
  // and found to be valid.
  const hsh = edi.getPostHash();
  if (hsh !== "") {
    return;
  }

  // We need to fake the claim ID temporarily in order to make the transaction
  // simulation work. Below we remove the fake again once we know our
  // transactions are validated.
  const exi = edi.post !== undefined && edi.post.id !== "" ? true : false;

  if (!exi) {
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

  if (edi.isPropose()) {
    await CreatePropose.Simulate();
  }

  if (edi.isDispute()) {
    await CreateDispute.Simulate();
  }

  // Reset the fake claim ID, but only if it was indeed the fake ID that we set
  // above.
  if (!exi) {
    edi.updatePost(EmptyPostCreateResponse());
  }
};

const ranNum = (len: number): BigInt => {
  const min = BigInt(10 ** (len - 1));
  const max = BigInt(10 ** len - 1);
  return BigInt(Math.floor(Math.random() * Number(max - min + BigInt(1))) + Number(min));
};
