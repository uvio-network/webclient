import { encodeFunctionData } from "viem";
import { ProposeContext } from "@/modules/context/ProposeContext";
import { Transaction } from "@biconomy/account";
import { ContractConfig } from "@/modules/contract/ContractConfig";

export const CreatePropose = (ctx: ProposeContext, cla: ContractConfig): Transaction => {
  const encodedCall = encodeFunctionData({
    abi: cla.abi,
    functionName: "createPropose",
    args: [
      [
        ctx.claim,      // claim, ID of the propose
        ctx.amount.big, // balance, the amount we deposited
        ctx.option,     // vote, agree or disagree with the claim
        ctx.expiry,     // expiry, unix timestamp in seconds
        [],             // whitelisted tokens, none
      ],
    ],
  });

  return {
    to: cla.address,
    data: encodedCall,
  };
}
