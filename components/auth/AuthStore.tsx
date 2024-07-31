import { create } from "zustand";
import { combine } from "zustand/middleware";

export interface AuthMessage {
  image: string;
  name: string;
  token: string;
  valid: boolean;
  wallet: string;
};

// TODO rename to UserStore
export const AuthStore = create(
  combine(
    {
      auth: {} as AuthMessage,
    },
    (set) => ({
      delete: () => {
        set(() => {
          return {
            auth: {
              image: "",
              name: "",
              token: "",
              valid: false,
              wallet: "",
            },
          };
        });
      },
      update: (a: AuthMessage) => {
        set(() => {
          return {
            auth: a,
          };
        });
      },
      updateImage: (i: string) => {
        set((state: { auth: AuthMessage }) => {
          return {
            auth: {
              ...state.auth,
              image: i,
            }
          };
        });
      },
      updateName: (n: string) => {
        set((state: { auth: AuthMessage }) => {
          return {
            auth: {
              ...state.auth,
              name: n,
            }
          };
        });
      },
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
