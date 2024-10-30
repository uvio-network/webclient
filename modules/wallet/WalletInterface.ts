import { Address } from "viem";
import { Transaction } from "@/modules/transaction/Transaction";

export interface Hash {
  transaction: string | Address;
  userOp: string | Address;
};

export interface Receipt {
  hash: Hash;
  rejected: boolean;
  success: boolean;
};

export const EmptyHash = (): Hash => {
  return {
    transaction: "",
    userOp: "",
  };
};

export const EmptyReceipt = (): Receipt => {
  return {
    hash: EmptyHash(),
    rejected: false,
    success: true,
  };
};

export const SuccessReceipt = (hsh: Hash): Receipt => {
  return {
    hash: hsh,
    rejected: false,
    success: true,
  };
};

export interface Signer {
  address(): Address;
  connectorType(): string;
  getUserOpReceipt(hsh: string): Promise<string>;
  sendTransaction(txn: Transaction[], bef: () => void, aft: () => void): Promise<Receipt>;
}
