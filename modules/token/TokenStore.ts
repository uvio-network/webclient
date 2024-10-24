import { ChainStore } from "@/modules/chain/ChainStore";
import { combine } from "zustand/middleware";
import { create } from "zustand";
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
        const wal = WalletStore.getState();

        const alo = get().allocated;
        const avl = get().available;

        await Promise.all(
          // Note that this goes through all tokens, e.g. UVX, WETH.
          Object.entries(chn.tokens).map(async ([key, val]: [string, TokenConfig]) => {
            const bal = await Promise.all([
              ...chn.contracts["Claims-" + key].map((x) => SearchBalance(wal, x, val)),
            ]);

            const [erc] = await Promise.all([
              TokenBalance(wal, val),
            ]);

            alo[key] = {
              ...val,
              balance: bal.reduce((sum, bal) => sum + bal.alo, 0),
            };

            avl[key] = {
              ...val,
              balance: bal.reduce((sum, bal) => sum + bal.avl, 0) + erc,
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
