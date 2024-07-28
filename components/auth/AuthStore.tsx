import { create } from "zustand";
import { combine } from "zustand/middleware";

export interface AuthMessage {
  token: string;
  valid: boolean;
  wallet: string;
};

export const AuthStore = create(
  combine(
    {
      auth: {} as AuthMessage,
    },
    (set) => ({
      updateToken: (t: string) => {
        set((state: { auth: AuthMessage }) => {
          return {
            auth: {
              ...state.auth,
              token: t,
              valid: t !== "",
            }
          };
        });
      },
      updateWallet: (w: string) => {
        set((state: { auth: AuthMessage }) => {
          return {
            auth: {
              ...state.auth,
              wallet: w,
            }
          };
        });
      },
    })
  )
);
