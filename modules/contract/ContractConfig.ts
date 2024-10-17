import { Address } from "viem";

export interface ContractConfig {
  abi: any;
  address: Address;
  latest: boolean;
};

export const EmptyContractConfig = (): ContractConfig => {
  return {
    // intern
    abi: {},
    address: "0x0",
    latest: false,
  };
};
