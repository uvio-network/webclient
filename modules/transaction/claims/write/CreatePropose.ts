import * as TokenApprove from "@/modules/transaction/token/write/TokenApprove";

import { EditorStore } from "@/modules/editor/EditorStore";
import { encodeFunctionData } from "viem";
import { EncodeFunctionDataParameters } from "viem";
import { Transaction } from "@/modules/transaction/TransactionInterface";
import { WalletStore } from "@/modules/wallet/WalletStore";

export const Encode = (): Transaction => {
  const edi = EditorStore.getState();

  return {
    to: edi.claims.address,
    data: encodeFunctionData(encPar()),
  };
};

export const Simulate = async () => {
  const edi = EditorStore.getState();
  const wal = WalletStore.getState();

  const amo = edi.getAmount().big;
  const cla = edi.claims.address;
  const frm = wal.object.address();
  const tok = edi.getToken().address;

  await wal.object.public().simulateContract({
    ...encPar(),
    address: cla,
    account: frm,
    stateOverride: [
      {
        address: tok,
        stateDiff: TokenApprove.State(frm, cla, amo),
      },
    ],
  });
};

const encPar = (): Required<EncodeFunctionDataParameters> => {
  const edi = EditorStore.getState();

  const amo = edi.getAmount().big;
  const cla = edi.claims.abi;
  const exp = edi.getExpiry();
  const opt = edi.option;
  const pro = edi.post.id;
  const ref = edi.reference;
  const tok = edi.getToken().abi;

  return {
    abi: [
      ...cla, // Claims ABI for contract write
      ...tok, // UVX ABI for contract simulation
    ],
    functionName: "createPropose",
    args: [
      pro, // claim, ID of the propose
      amo, // balance, the amount we deposited
      opt, // vote, agree or disagree with the claim
      exp, // expiry, unix timestamp in seconds
      ref, // hash, the claim's content checksum
      [],  // whitelisted tokens, none for now
    ],
  };
};
