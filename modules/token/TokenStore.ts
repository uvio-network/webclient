import { ChainStore } from "@/modules/chain/ChainStore";
import { create } from "zustand";
import { combine } from "zustand/middleware";
import { TokenBalance } from "@/modules/transaction/TokenBalance";
import { TokenConfig } from "@/modules/token/TokenConfig";
import { WalletStore } from "@/modules/wallet/WalletStore";

export interface TokenMessage {
  [key: string]: TokenConfig & { balance: number };
};

export const TokenStore = create(
  combine(
    {
      allocated: {} as TokenMessage,
      available: {} as TokenMessage,
    },
    (set, get) => ({
      updateAllocated: async (k: string, b: number) => {
        const chn = ChainStore.getState().getActive();

        const alo = get().allocated;

        set((state: { allocated: TokenMessage }) => {
          const balance = (state.allocated[k]?.balance || 0) + b;

          alo[k] = {
            ...chn.tokens[k],
            balance,
          };

          return {
            ...state,
            allocated: alo,
          };
        });
      },

      updateAvailable: async () => {
        const chn = ChainStore.getState().getActive();
        const wal = WalletStore.getState().wallet;

        const avl = get().available;

        await Promise.all(
          Object.entries(chn.tokens).map(async ([key, val]: [string, TokenConfig]) => {
            const balance = await TokenBalance(wal, val);

            avl[key] = {
              ...val,
              balance,
            };
          })
        );

        set((state) => {
          return {
            ...state,
            available: avl,
          };
        });
      },
    })
  )
);
