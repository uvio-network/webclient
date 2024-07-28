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
      update: (m: AuthMessage) => {
        set((state: { auth: AuthMessage }) => {
          return {
            auth: {
              ...state.auth,
              token: m.token,
              valid: m.valid,
              wallet: m.wallet,
            }
          };
        });
      },
    })
  )
);
