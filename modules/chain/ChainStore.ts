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
    newChainMessage(),
    (set, get) => ({
      activate: (i: number) => {
        set((state: ChainMessage) => {
          return {
            ...state,
            active: i,
          };
        });
      },
      getActive: (): ChainConfig => {
        return get().chains.get(get().active)!;
      },
      getAll: (): ChainConfig[] => {
        return Array.from(get().chains.values());
      },
      update: (c: ChainConfig) => {
        set((state: ChainMessage) => {
          const m = new Map(state.chains);
          m.set(c.id, c);
          return {
            ...state,
            chains: m,
          };
        });
      },
    })
  )
);
