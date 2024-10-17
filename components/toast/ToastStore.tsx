import { combine } from "zustand/middleware";
import { create } from "zustand";

export interface ToastMessage {
  clss: string;
  repl: boolean;
  spin: boolean;
  titl: string;
  text: string;
  unix: number;
};

export const ToastStore = create(
  combine(
    {
      toasts: [] as ToastMessage[],
    },
    (set) => ({
      create: (m: ToastMessage) => {
        set((state) => {
          const lis = [...state.toasts];

          if (m.repl === true && lis.length !== 0) {
            lis.pop();
          }

          {
            lis.push(m);
          }

          return { toasts: lis };
        });
      },
      delete: (u: number) => {
        set((state: { toasts: [] }) => {
          const lis = [...state.toasts];
          return { toasts: lis.filter((x: ToastMessage) => x.unix !== u) };
        });
      },
    })
  )
);
