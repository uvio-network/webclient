import { create } from "zustand";
import { combine } from "zustand/middleware";

interface Toast {
  class: "err" | "inf" | "suc";
  title: string;
  text: string;
}

export const useToastStore = create(
  combine(
    {
      toasts: [] as Toast[],
    },
    (set) => ({
      addToast: (toast: Toast) => {
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
