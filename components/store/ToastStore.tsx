import { create } from "zustand";
import { combine } from "zustand/middleware";

export interface ToastMessage {
  clss: string;
  titl: string;
  text: string;
}

export const useToastStore = create(
  combine(
    {
      toasts: [] as ToastMessage[],
    },
    (set) => ({
      addToast: (toast: ToastMessage) => {
        set((state) => {
          const newToasts = [...state.toasts];

          newToasts.push(toast);

          return { toasts: newToasts };
        });
      },
      removeToast: (index: number) => {
        set((state) => {
          const newToasts = [...state.toasts];

          // Splice it out.

          return { toasts: newToasts };
        });
      },
    })
  )
);
