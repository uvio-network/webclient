import { create } from "zustand";
import { combine } from "zustand/middleware";
import { TokenBalance } from "@/modules/transaction/TokenBalance";
import { TokenConfig } from "@/modules/token/TokenConfig";
import { WalletMessage } from "@/modules/wallet/WalletStore";

export interface TokenMessage {
  [key: string]: string;
};

export const TokenStore = create(
  combine(
    {
      token: {} as TokenMessage,
    },
    (set, get) => ({
      update: async (w: WalletMessage, t: { [key: string]: TokenConfig }) => {
        const tok = get().token;

        await Promise.all(
          Object.entries(t).map(async ([key, val]: [string, TokenConfig]) => {
            tok[key] = await TokenBalance(w, val);
          })
        );

        set((state) => {
          return {
            token: tok,
          };
        });
      },
    })
  )
);
