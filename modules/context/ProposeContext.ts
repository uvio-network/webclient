import { PostCreateResponse } from "@/modules/api/post/create/Response";
import { TokenConfig } from "@/modules/token/TokenConfig";
import { VoteCreateResponse } from "@/modules/api/vote/create/Response";

export interface ProposeContext {
  amount: number;
  auth: string;
  chain: string;
  claim: string;
  expiry: number;
  hash: string;
  post: PostCreateResponse;
  success: boolean;
  token: TokenConfig;
  tree: string;
  vote: VoteCreateResponse;
}
