import { combine } from "zustand/middleware";
import { create } from "zustand";
import { WalletObject } from "@/modules/wallet/WalletObject";

export interface WalletMessage {
  object: WalletObject;
  ready: boolean;
};

export const WalletStore = create(
  combine(
    {} as WalletMessage,
    (set) => ({
      delete: () => {
        set(() => {
          return {
            object: new WalletObject(),
            ready: false,
          };
        });
      },
      update: (w: WalletMessage) => {
        set(() => {
          return w;
        });
      },
    })
  )
);
