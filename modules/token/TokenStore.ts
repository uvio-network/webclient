import { ChainStore } from "@/modules/chain/ChainStore";
import { create } from "zustand";
import { combine } from "zustand/middleware";
import { MarketsBalance } from "@/modules/transaction/markets/MarketsBalance";
import { TokenBalance } from "@/modules/transaction/token/TokenBalance";
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
      delete: () => {
        set(() => {
          return {
            allocated: {},
            available: {},
          };
        });
      },

      deleteAllocated: async (k: string, b: number) => {
        const chn = ChainStore.getState().getActive();

        if (!get().allocated[k]) {
          return;
        }

        set((state: { allocated: TokenMessage }) => {
          const balance = state.allocated[k].balance - b;

          state.allocated[k] = {
            ...chn.tokens[k],
            balance,
          };

          return {
            ...state,
            allocated: state.allocated,
          };
        });
      },

      updateAllocated: async (k: string, b: number) => {
        const chn = ChainStore.getState().getActive();

        set((state: { allocated: TokenMessage }) => {
          const balance = (state.allocated[k]?.balance || 0) + b;

          state.allocated[k] = {
            ...chn.tokens[k],
            balance,
          };

          return {
            ...state,
            allocated: state.allocated,
          };
        });
      },

      updateAvailable: async () => {
        const chn = ChainStore.getState().getActive();
        const wal = WalletStore.getState().wallet;

        const avl = get().available;

        await Promise.all(
          Object.entries(chn.tokens).map(async ([key, val]: [string, TokenConfig]) => {
            const [mar, tok] = await Promise.all([
              MarketsBalance(wal, val),
              TokenBalance(wal, val),
            ]);

            avl[key] = {
              ...val,
              balance: mar + tok,
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
