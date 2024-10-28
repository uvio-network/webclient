import { Address } from "viem";
import { Chain } from "viem/chains";
import { ContractConfig } from "@/modules/contract/ContractConfig";
import { TokenConfig } from "@/modules/token/TokenConfig";
import { truncateEthAddress } from "@/modules/wallet/WalletAddress";

export interface ChainConfig extends Omit<Chain, "contracts"> {
  coinbasePaymasterEndpoint: string;
  contracts: { [key: string]: ContractConfig[] };
  rpcEndpoints: string[];
  tokens: { [key: string]: TokenConfig };
};

export const ClaimsWithSymbol = (sym: string, chn: ChainConfig): ContractConfig => {
  const con = chn.contracts["Claims-" + sym].find((x: ContractConfig) => {
    return x.latest === true;
  });

  if (con === undefined) {
    throw `Could not find contract config for token symbol ${sym}.`;
  }

  return con;
};

export const ContractWithAddress = (add: Address, chn: ChainConfig): ContractConfig => {
  const con = Object.values(chn.contracts).flat().find((x: ContractConfig) => {
    return x.address === add;
  });

  if (con === undefined) {
    throw `Could not find contract config for contract address ${truncateEthAddress(add)}.`;
  }

  return con;
};
