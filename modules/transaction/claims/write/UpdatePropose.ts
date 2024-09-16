import * as TokenApprove from "@/modules/transaction/token/write/TokenApprove";

import { encodeFunctionData } from "viem";
import { EncodeFunctionDataParameters } from "viem";
import { StakeContext } from "@/modules/context/StakeContext";
import { Transaction } from "@biconomy/account";

export const Encode = (ctx: StakeContext): Transaction => {
  return {
    to: ctx.claims.address,
    data: encodeFunctionData(newPar(ctx)),
  };
}

export const Simulate = async (ctx: StakeContext) => {
  await ctx.public.simulateContract({
    ...newPar(ctx),
    address: ctx.claims.address,
    account: ctx.from,
    stateOverride: [
      {
        address: ctx.token.address,
        stateDiff: TokenApprove.State(ctx.from, ctx.claims.address, ctx.amount.big),
      },
    ],
  });
}

const newPar = (ctx: StakeContext): Required<EncodeFunctionDataParameters> => {
  return {
    abi: [
      ...ctx.claims.abi, // Claims ABI for contract write
      ...ctx.token.abi,  // UVX ABI for contract simulation
    ],
    functionName: "updatePropose",
    args: [
      ctx.claim,         // claim, ID of the propose
      ctx.amount.big,    // balance, the amount we deposited
      ctx.option,        // vote, agree or disagree with the claim
      0,                 // token index, none whitelisted for now
    ],
  };
};
