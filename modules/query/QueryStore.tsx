import { combine } from "zustand/middleware";
import { create } from "zustand";
import { QueryClient } from "@tanstack/react-query";

export interface ClaimQueryMessage {
  client: QueryClient;
  refresh: () => void;
};

const newClaimQueryMessage = (): ClaimQueryMessage => {
  return {
    client: new QueryClient(),
    refresh: () => { },
  };
};

export const QueryStore = create(
  combine(
    {
      claim: newClaimQueryMessage(),
    },
    (set) => ({
      updateClaimRefresh: (f: () => void) => {
        set((state: { claim: ClaimQueryMessage }) => {
          return {
            ...state,
            claim: {
              ...state.claim,
              refresh: f,
            },
          };
        });
      },
    })
  )
);
