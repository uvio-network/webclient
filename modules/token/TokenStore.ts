import { ChainStore } from "@/modules/chain/ChainStore";
import { create } from "zustand";
import { combine } from "zustand/middleware";
import { SearchBalance } from "@/modules/transaction/claims/read/SearchBalance";
import { TokenBalance } from "@/modules/transaction/token/read/TokenBalance";
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

      updateBalance: async () => {
        const chn = ChainStore.getState().getActive();
        const wal = WalletStore.getState().wallet;

        const alo = get().allocated;
        const avl = get().available;

        await Promise.all(
          Object.entries(chn.tokens).map(async ([key, val]: [string, TokenConfig]) => {
            const [bal, erc] = await Promise.all([
              SearchBalance(wal, chn.contracts[key], val),
              TokenBalance(wal, val),
            ]);

            alo[key] = {
              ...val,
              balance: bal.alo,
            };

            avl[key] = {
              ...val,
              balance: bal.avl + erc,
            };
          })
        );

        set(() => {
          return {
            allocated: alo,
            available: avl,
          };
        });
      },
    })
  )
);
