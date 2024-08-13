import { Address } from "viem";

export interface TokenConfig {
  abi: any;
  address: Address;
  decimals: number;
  precision: number;
};
