import { Address } from "viem";
import { ContractConfig } from "@/modules/contract/ContractConfig";
import { PublicClient } from "viem";
import { TokenConfig } from "@/modules/token/TokenConfig";
import { VoteCreateResponse } from "@/modules/api/vote/create/Response";

export interface StakeContext {
  amount: {
    num: number;
    big: bigint;
  };
  auth: string;
  chain: string;
  claim: string;
  claims: ContractConfig;
  from: Address;
  hash: string;
  option: boolean;
  public: PublicClient;
  success: boolean;
  symbol: string;
  token: TokenConfig;
  vote: VoteCreateResponse;
}
