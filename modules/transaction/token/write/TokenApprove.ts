import { ContractConfig } from "@/modules/contract/ContractConfig";
import { encodeFunctionData } from "viem";
import { TokenConfig } from "@/modules/token/TokenConfig";
import { Transaction } from "@biconomy/account";

export const TokenApprove = (amo: bigint, spd: ContractConfig, tok: TokenConfig): Transaction => {
  const encodedCall = encodeFunctionData({
    abi: tok.abi,
    functionName: "approve",
    args: [
      spd.address, // spender address
      amo,         // token amount
    ],
  });

  return {
    to: tok.address,
    data: encodedCall,
  };
}
