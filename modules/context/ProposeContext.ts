import { PostCreateResponse } from "@/modules/api/post/create/Response";
import { TokenConfig } from "@/modules/token/TokenConfig";
import { VoteCreateResponse } from "@/modules/api/vote/create/Response";
import { ContractConfig } from "../contract/ContractConfig";

export interface ProposeContext {
  amount: {
    num: number;
    big: bigint;
  };
  auth: string;
  chain: string;
  claim: string;
  claims: ContractConfig;
  expiry: number;
  hash: string;
  option: boolean;
  post: PostCreateResponse;
  success: boolean;
  symbol: string;
  token: TokenConfig;
  vote: VoteCreateResponse;
}
