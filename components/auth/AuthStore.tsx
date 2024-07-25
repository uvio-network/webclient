import { create } from "zustand";
import { combine } from "zustand/middleware";

export interface AuthMessage {
  ready: boolean;
  token: string;
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
              ready: m.ready,
              token: m.token,
            }
          };
        });
      },
    })
  )
);
