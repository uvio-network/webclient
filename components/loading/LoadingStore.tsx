import { combine } from "zustand/middleware";
import { create } from "zustand";

export const LoadingStore = create(
  combine(
    {
      authorized: false,
      loaded: false,
    },
    (set, get) => ({
      setAuthorized: () => {
        set(() => {
          return {
            authorized: true,
          };
        });
      },
      setLoaded: () => {
        if (get().loaded) {
          return;
        }

        set(() => {
          return {
            loaded: true,
          };
        });
      },
    })
  )
);
