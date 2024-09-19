import { Address } from "viem";
import { ContractConfig } from "@/modules/contract/ContractConfig";
import { PublicClient } from "viem";
import { Receipt } from "@/modules/wallet/WalletInterface";
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
  option: boolean;
  public: PublicClient;
  receipt: Receipt;
  symbol: string;
  token: TokenConfig;
  vote: VoteCreateResponse;
}
