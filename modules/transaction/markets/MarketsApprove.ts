import { ChainStore } from "@/modules/chain/ChainStore";
import { encodeFunctionData } from "viem";
import { parseUnits } from "viem";
import { TokenConfig } from "@/modules/token/TokenConfig";
import { Transaction } from "@biconomy/account";

export const MarketsApprove = (amo: number, tok: TokenConfig): Transaction => {
  const chain = ChainStore.getState().getActive();
  const markets = chain.contracts["Markets"];

  const encodedCall = encodeFunctionData({
    abi: tok.abi,
    functionName: "approve",
    args: [
      markets.address,
      parseUnits(String(amo), tok.decimals),
    ],
  });

  return {
    to: tok.address,
    data: encodedCall,
  };
}
