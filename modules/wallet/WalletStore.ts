import { create } from "zustand";
import { combine } from "zustand/middleware";
import { WalletObject } from "@/modules/wallet/WalletObject";

export interface WalletMessage {
  object: WalletObject;
  ready: boolean;
};

export const WalletStore = create(
  combine(
    {
      wallet: {} as WalletMessage,
    },
    (set) => ({
      delete: () => {
        set(() => {
          return {
            wallet: {
              object: new WalletObject(),
              ready: false,
            },
          };
        });
      },
      update: (w: WalletMessage) => {
        set(() => {
          return {
            wallet: w,
          };
        });
      },
    })
  )
);
