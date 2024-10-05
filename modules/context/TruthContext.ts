import { Address } from "viem";
import { ContractConfig } from "@/modules/contract/ContractConfig";
import { PublicClient } from "viem";
import { Receipt } from "@/modules/wallet/WalletInterface";
import { VoteCreateResponse } from "@/modules/api/vote/create/Response";

export interface TruthContext {
  after: () => void;
  auth: string;
  before: () => void;
  chain: string;
  claim: {
    propose: string;
    resolve: string;
  };
  claims: ContractConfig;
  from: Address;
  option: boolean;
  public: PublicClient;
  receipt: Receipt;
  vote: VoteCreateResponse;
}
