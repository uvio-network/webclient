import { combine } from "zustand/middleware";
import { create } from "zustand";

export const WindowStore = create(
  combine(
    {
      breakpoint: false,
    },
    (set) => ({
      updateBreakpoint: (b: boolean) => {
        set(() => {
          return {
            breakpoint: b,
          };
        });
      },
    })
  )
);
