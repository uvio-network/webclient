import { Address } from "viem";
import { Transaction } from "@biconomy/account";

export interface Receipt {
  hash: string;
  success: boolean;
};

export interface Signer {
  address(): Address;
  connectorType(): string;
  sendTransaction(txn: Transaction[]): Promise<Receipt>;
}
