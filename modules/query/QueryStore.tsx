import { create } from "zustand";
import { combine } from "zustand/middleware";

export interface ClaimMessage {
  refresh: () => void;
};

export const QueryStore = create(
  combine(
    {
      claim: {} as ClaimMessage,
    },
    (set) => ({
      updateClaim: (c: ClaimMessage) => {
        set(() => {
          return {
            claim: c,
          };
        });
      },
    })
  )
);
