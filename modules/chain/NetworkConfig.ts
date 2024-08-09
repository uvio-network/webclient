import { Chain } from "viem/chains";

export interface NetworkConfig extends Chain {
  biconomyPaymasterApiKey: string;
  rpcEndpoints: string[];
};
