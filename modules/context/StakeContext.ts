import { Address } from "viem";
import { ClaimObject } from "@/modules/claim/ClaimObject";
import { ContractConfig } from "@/modules/contract/ContractConfig";
import { PostCreateResponse } from "@/modules/api/post/create/Response";
import { PublicClient } from "viem";
import { Receipt } from "@/modules/wallet/WalletInterface";
import { TokenConfig } from "@/modules/token/TokenConfig";
import { VoteCreateResponse } from "@/modules/api/vote/create/Response";

export interface StakeContext {
  after: () => void;
  amount: {
    num: number;
    big: bigint;
  };
  auth: string;
  before: () => void;
  chain: string;
  claim: string;
  claims: ContractConfig;
  expiry: number;
  from: Address;
  option: boolean;
  pending: ClaimObject | undefined;
  post: PostCreateResponse;
  public: PublicClient;
  receipt: Receipt;
  reference: string;
  symbol: string;
  token: TokenConfig;
  vote: VoteCreateResponse;
}
