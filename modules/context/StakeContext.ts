import { TokenConfig } from "@/modules/token/TokenConfig";
import { VoteCreateResponse } from "@/modules/api/vote/create/Response";

export interface StakeContext {
  amount: number;
  auth: string;
  chain: string;
  claim: string;
  hash: string;
  option: boolean;
  success: boolean;
  token: TokenConfig;
  tree: string;
  vote: VoteCreateResponse;
}
