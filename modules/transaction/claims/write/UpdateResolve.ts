import { EditorStore } from "@/modules/editor/EditorStore";
import { encodeFunctionData } from "viem";
import { EncodeFunctionDataParameters } from "viem";
import { Transaction } from "@/modules/transaction/Transaction";
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

  const cla = edi.claims.address;
  const frm = wal.object.address();

  await wal.object.public().simulateContract({
    ...newPar(),
    address: cla,
    account: frm,
  });
}

const newPar = (): Required<EncodeFunctionDataParameters> => {
  const edi = EditorStore.getState();

  const cla = edi.claims.abi;
  const opt = edi.option;
  const pod = edi.propose.id();

  return {
    abi: [
      ...cla, // Claims ABI for contract write
    ],
    functionName: "updateResolve",
    args: [
      pod, // claim, ID of the propose or dispute
      opt, // vote, verify the truth with true or false
    ],
  };
};
