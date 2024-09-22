import { create } from "zustand";
import { combine } from "zustand/middleware";

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
