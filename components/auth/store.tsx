import { create } from "zustand";
import { combine } from "zustand/middleware";

export interface Message {
  ready: boolean;
  token: string;
};

export const useStore = create(
  combine(
    {
      auth: {} as Message,
    },
    (set) => ({
      update: (m: Message) => {
        set((state: { auth: Message }) => {
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
