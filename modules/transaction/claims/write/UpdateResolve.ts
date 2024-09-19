import { encodeFunctionData } from "viem";
import { EncodeFunctionDataParameters } from "viem";
import { Transaction } from "@biconomy/account";
import { TruthContext } from "@/modules/context/TruthContext";

export const Encode = (ctx: TruthContext): Transaction => {
  return {
    to: ctx.claims.address,
    data: encodeFunctionData(newPar(ctx)),
  };
}

export const Simulate = async (ctx: TruthContext) => {
  await ctx.public.simulateContract({
    ...newPar(ctx),
    address: ctx.claims.address,
    account: ctx.from,
  });
}

const newPar = (ctx: TruthContext): Required<EncodeFunctionDataParameters> => {
  return {
    abi: [
      ...ctx.claims.abi, // Claims ABI for contract write
    ],
    functionName: "updateResolve",
    args: [
      ctx.claim.propose, // propose, ID of the propose
      ctx.option,        // vote, verify the truth with true or false
    ],
  };
};
