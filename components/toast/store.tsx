import { create } from "zustand";
import { combine } from "zustand/middleware";

export interface Message {
  clss: string;
  titl: string;
  text: string;
  unix: number;
};

export const useStore = create(
  combine(
    {
      toasts: [] as Message[],
    },
    (set) => ({
      create: (m: Message) => {
        set((state) => {
          const lis = [...state.toasts];
          lis.push(m);
          return { toasts: lis };
        });
      },
      delete: (m: Message) => {
        set((state: { toasts: [] }) => {
          const lis = [...state.toasts];
          return { toasts: lis.filter((x: Message) => x.unix !== m.unix) };
        });
      },
    })
  )
);
