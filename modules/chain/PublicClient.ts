import { Chain } from "viem";
import { ChainStore } from "@/modules/chain/ChainStore";
import { createPublicClient } from "viem";
import { http } from "viem";
import { PublicClient } from "viem";

export const NewPublicClient = (): PublicClient => {
  const chain = ChainStore.getState();
  const active = chain.getActive();

  return createPublicClient({
    batch: {
      multicall: true,
    },
    chain: active as Chain,
    transport: http(active.rpcEndpoints[0]),
  });
};
