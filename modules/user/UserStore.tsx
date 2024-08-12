import { create } from "zustand";
import { combine } from "zustand/middleware";

export interface UserMessage {
  id: string;
  image: string;
  name: string;
  token: string;
  valid: boolean;
};

export const UserStore = create(
  combine(
    {
      user: {} as UserMessage,
    },
    (set) => ({
      delete: () => {
        set(() => {
          return {
            user: {
              id: "",
              image: "",
              name: "",
              token: "",
              valid: false,
            },
          };
        });
      },
      update: (u: UserMessage) => {
        set(() => {
          return {
            user: u,
          };
        });
      },
      updateId: (i: string) => {
        set((state: { user: UserMessage }) => {
          return {
            user: {
              ...state.user,
              id: i,
            }
          };
        });
      },
      updateImage: (i: string) => {
        set((state: { user: UserMessage }) => {
          return {
            user: {
              ...state.user,
              image: i,
            }
          };
        });
      },
      updateName: (n: string) => {
        set((state: { user: UserMessage }) => {
          return {
            user: {
              ...state.user,
              name: n,
            }
          };
        });
      },
      updateToken: (t: string) => {
        set((state: { user: UserMessage }) => {
          return {
            user: {
              ...state.user,
              token: t,
            }
          };
        });
      },
    })
  )
);
