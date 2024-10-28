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
    data: encodeFunctionData(newPar()),
  };
}

export const Simulate = async () => {
  const edi = EditorStore.getState();
  const wal = WalletStore.getState();

  const amo = edi.getAmount().big;
  const cla = edi.claims.address;
  const frm = wal.object.address();
  const tok = edi.getToken().address;

  await wal.object.public().simulateContract({
    ...newPar(),
    address: cla,
    account: frm,
    stateOverride: [
      {
        address: tok,
        stateDiff: TokenApprove.State(frm, cla, amo),
      },
    ],
  });
}

const newPar = (): Required<EncodeFunctionDataParameters> => {
  const edi = EditorStore.getState();

  const amo = edi.getAmount().big;
  const cla = edi.claims.abi;
  const opt = edi.option;
  const pod = edi.propose.id();
  const tok = edi.getToken().abi;

  return {
    abi: [
      ...cla, // Claims ABI for contract write
      ...tok, // UVX ABI for contract simulation
    ],
    functionName: "updatePropose",
    args: [
      pod, // claim, ID of the propose or dispute
      amo, // balance, the amount we deposited
      opt, // vote, agree or disagree with the claim
      0,   // token index, none whitelisted for now
    ],
  };
};
