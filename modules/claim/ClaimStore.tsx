import { combine } from "zustand/middleware";
import { create } from "zustand";

export const ClaimStore = create(
  combine(
    {
      tree: "",
    },
    (set) => ({
      delete: () => {
        set(() => {
          return {
            tree: "",
          };
        });
      },
      updateTree: (t: string) => {
        set(() => {
          return {
            tree: t,
          };
        });
      },
    })
  )
);
