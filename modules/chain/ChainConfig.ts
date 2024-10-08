import { Address } from "viem";
import { Chain } from "viem/chains";
import { ContractConfig } from "@/modules/contract/ContractConfig";
import { TokenConfig } from "@/modules/token/TokenConfig";

export interface ChainConfig extends Omit<Chain, "contracts"> {
  biconomyPaymasterApiKey: string;
  contracts: { [key: string]: ContractConfig[] };
  rpcEndpoints: string[];
  tokens: { [key: string]: TokenConfig };
};

export const ClaimsWithSymbol = (sym: string, chn: ChainConfig): ContractConfig => {
  const con = chn.contracts["Claims-" + sym].find((x: ContractConfig) => {
    return x.latest === true;
  });

  if (con === undefined) {
    throw "could not find contract config based on contract address";
  }

  return con;
};

export const ContractWithAddress = (add: Address, chn: ChainConfig): ContractConfig => {
  const con = Object.values(chn.contracts).flat().find((x: ContractConfig) => {
    return x.address === add;
  });

  if (con === undefined) {
    throw "could not find contract config based on contract address";
  }

  return con;
};
