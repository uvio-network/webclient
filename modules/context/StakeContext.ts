import { TokenConfig } from "@/modules/token/TokenConfig";
import { VoteCreateResponse } from "@/modules/api/vote/create/Response";
import { ContractConfig } from "@/modules/contract/ContractConfig";

export interface StakeContext {
  amount: {
    num: number;
    big: bigint;
  };
  auth: string;
  chain: string;
  claim: string;
  claims: ContractConfig;
  hash: string;
  option: boolean;
  success: boolean;
  symbol: string;
  token: TokenConfig;
  vote: VoteCreateResponse;
}
