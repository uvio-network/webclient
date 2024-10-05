import { Address } from "viem";
import { Transaction } from "@biconomy/account";

export interface Receipt {
  hash: string;
  rejected: boolean;
  success: boolean;
};

export const EmptyReceipt = (): Receipt => {
  return {
    hash: "",
    rejected: false,
    success: false,
  };
};

export const RejectedReceipt = (): Receipt => {
  return {
    hash: "",
    rejected: true,
    success: false,
  };
};

export interface Signer {
  address(): Address;
  connectorType(): string;
  sendTransaction(txn: Transaction[], bef: () => void, aft: () => void): Promise<Receipt>;
}
