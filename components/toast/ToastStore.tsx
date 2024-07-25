import { create } from "zustand";
import { combine } from "zustand/middleware";

export interface ToastMessage {
  clss: string;
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
          lis.push(m);
          return { toasts: lis };
        });
      },
      delete: (m: ToastMessage) => {
        set((state: { toasts: [] }) => {
          const lis = [...state.toasts];
          return { toasts: lis.filter((x: ToastMessage) => x.unix !== m.unix) };
        });
      },
    })
  )
);
