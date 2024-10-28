import { Hex } from "viem";

export interface Transaction {
  to: string | Hex;
  data: string | Hex;
};
