import { Address } from "viem";
import { ContractConfig } from "@/modules/contract/ContractConfig";
import { PostCreateResponse } from "@/modules/api/post/create/Response";
import { PublicClient } from "viem";
import { TokenConfig } from "@/modules/token/TokenConfig";
import { VoteCreateResponse } from "@/modules/api/vote/create/Response";

export interface ProposeContext {
  amount: {
    num: number;
    big: bigint;
  };
  auth: string;
  chain: string;
  claims: ContractConfig;
  expiry: number;
  from: Address;
  hash: string;
  labels: string;
  markdown: string;
  option: boolean;
  post: PostCreateResponse;
  public: PublicClient;
  reference: string;
  success: boolean;
  symbol: string;
  token: TokenConfig;
  vote: VoteCreateResponse;
}
