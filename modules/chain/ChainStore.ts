import { ChainConfig } from "@/modules/chain/ChainConfig";
import { ChainWhitelist } from "@/modules/chain/ChainWhitelist";
import { combine } from "zustand/middleware";
import { create } from "zustand";
import { DefaultChainId } from "@/modules/config";

export interface ChainMessage {
  // active is the chain ID being used right now.
  active: number;
  // chains is the map of all selectable chains.
  chains: Map<number, ChainConfig>;
};

const newChainMessage = (): ChainMessage => {
  const m: Map<number, ChainConfig> = new Map();

  for (const x of ChainWhitelist) {
    m.set(x.id, x);
  }

  return {
    active: DefaultChainId,
    chains: m,
  };
};

export const ChainStore = create(
  combine(
    {
      chain: newChainMessage(),
    },
    (set, get) => ({
      activate: (i: number) => {
        set((state: { chain: ChainMessage }) => {
          return {
            chain: {
              ...state.chain,
              active: i,
            },
          };
        });
      },
      getActive: (): ChainConfig => {
        const state = get();
        return state.chain.chains.get(state.chain.active)!;
      },
      getAll: (): ChainConfig[] => {
        return Array.from(get().chain.chains.values());
      },
      update: (c: ChainConfig) => {
        set((state: { chain: ChainMessage }) => {
          const m = new Map(state.chain.chains);
          m.set(c.id, c);
          return {
            chain: {
              ...state.chain,
              chains: m,
            },
          };
        });
      },
    })
  )
);
