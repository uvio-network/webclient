import { encodeFunctionData } from "viem";
import { StakeContext } from "@/modules/context/StakeContext";
import { Transaction } from "@biconomy/account";
import { ContractConfig } from "@/modules/contract/ContractConfig";

export const UpdatePropose = (ctx: StakeContext, cla: ContractConfig): Transaction => {
  const encodedCall = encodeFunctionData({
    abi: cla.abi,
    functionName: "updatePropose",
    args: [
      ctx.claim,      // claim, ID of the propose
      ctx.amount.big, // balance, the amount we deposited
      ctx.option,     // vote, agree or disagree with the claim
      0,              // token index, none whitelisted for now
    ],
  });

  return {
    to: cla.address,
    data: encodedCall,
  };
}
