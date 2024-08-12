import { create } from "zustand";
import { combine } from "zustand/middleware";
import { PublicClient } from "viem";
import { WalletObject } from "@/modules/wallet/WalletObject";

export interface WalletMessage {
  // contract is the smart account instance or smart contract wallet as selected
  // by the user, if any. Should the user choose to do without account
  // abstraction, then contract is undefined.
  contract: WalletObject | undefined;

  // public is the public blockchain client configured for the selected network.
  // This client is used to read public onchain data like token balances.
  public: PublicClient | undefined;

  // ready indicates whether the user's clients and wallets are initialized.
  ready: boolean;

  // signer is the wallet that controls the user's smart contract wallet, if
  // account abstraction is being used. The user may choose to use any wallet
  // without account abstraction, so that the signer replaces the contract to
  // represent the user onchain.
  signer: WalletObject | undefined;
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
              contract: undefined,
              public: undefined,
              ready: false,
              signer: undefined,
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
