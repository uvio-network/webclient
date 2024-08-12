import { create } from "zustand";
import { combine } from "zustand/middleware";

export interface AuthMessage {
  id: string;
  image: string;
  name: string;
  token: string;
  valid: boolean;
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
              id: "",
              image: "",
              name: "",
              token: "",
              valid: false,
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
      updateId: (i: string) => {
        set((state: { auth: AuthMessage }) => {
          return {
            auth: {
              ...state.auth,
              id: i,
            }
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
            }
          };
        });
      },
    })
  )
);
