import * as TokenApprove from "@/modules/transaction/token/write/TokenApprove";

import { encodeFunctionData } from "viem";
import { EncodeFunctionDataParameters } from "viem";
import { ProposeContext } from "@/modules/context/ProposeContext";
import { Transaction } from "@biconomy/account";

export const Encode = (ctx: ProposeContext): Transaction => {
  return {
    to: ctx.claims.address,
    data: encodeFunctionData(encPar(ctx)),
  };
};

export const Simulate = async (ctx: ProposeContext) => {
  await ctx.public.simulateContract({
    ...encPar(ctx),
    address: ctx.claims.address,
    account: ctx.from,
    stateOverride: [
      {
        address: ctx.token.address,
        stateDiff: TokenApprove.State(ctx.from, ctx.claims.address, ctx.amount.big),
      },
    ],
  });
};

const encPar = (ctx: ProposeContext): Required<EncodeFunctionDataParameters> => {
  return {
    abi: [
      ...ctx.claims.abi, // Claims ABI for contract write
      ...ctx.token.abi,  // UVX ABI for contract simulation
    ],
    functionName: "createPropose",
    args: [
      ctx.post.id,       // claim, ID of the propose
      ctx.amount.big,    // balance, the amount we deposited
      ctx.option,        // vote, agree or disagree with the claim
      ctx.expiry,        // expiry, unix timestamp in seconds
      ctx.reference,     // hash, the claim's content checksum
      [],                // whitelisted tokens, none
    ],
  };
};
