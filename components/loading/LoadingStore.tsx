import { create } from "zustand";
import { combine } from "zustand/middleware";

export const LoadingStore = create(
  combine(
    {
      authorizing: true,
      loading: true,
    },
    (set) => ({
      authorized: () => {
        set(() => {
          return {
            authorizing: false,
          };
        });
      },
      loaded: () => {
        set(() => {
          return {
            loading: false,
          };
        });
      },
    })
  )
);
