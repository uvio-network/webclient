import { Address } from "viem";

export interface ContractConfig {
  abi: any;
  address: Address;
  latest: boolean;
};
