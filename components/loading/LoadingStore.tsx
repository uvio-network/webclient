import { create } from "zustand";
import { combine } from "zustand/middleware";

export const LoadingStore = create(
  combine(
    {
      authorizing: true,
      loading: true,
    },
    (set, get) => ({
      authorized: () => {
        set(() => {
          return {
            authorizing: false,
          };
        });
      },
      loaded: () => {
        if (get().loading === false) {
          return;
        }

        set(() => {
          return {
            loading: false,
          };
        });
      },
    })
  )
);
