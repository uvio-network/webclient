import { TokenConfig } from "@/modules/token/TokenConfig";
import { VoteCreateResponse } from "@/modules/api/vote/create/Response";

export interface StakeContext {
  amount: number;
  auth: string;
  chain: string;
  claim: string;
  hash: string;
  token: TokenConfig;
  vote: VoteCreateResponse;
}
