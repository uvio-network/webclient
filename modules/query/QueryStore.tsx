import { combine } from "zustand/middleware";
import { create } from "zustand";
import { QueryClient } from "@tanstack/react-query";

export interface ClaimQueryMessage {
  client: QueryClient;
  filter: "agree" | "all" | "disagree";
  refresh: () => void;
};

const newClaimQueryMessage = (): ClaimQueryMessage => {
  return {
    client: new QueryClient(),
    filter: "all",
    refresh: () => { },
  };
};

export const QueryStore = create(
  combine(
    {
      claim: newClaimQueryMessage(),
    },
    (set) => ({
      updateClaimFilter: (f: "agree" | "all" | "disagree") => {
        set((state: { claim: ClaimQueryMessage }) => {
          return {
            ...state,
            claim: {
              ...state.claim,
              filter: f,
            },
          };
        });
      },
      updateClaimRefresh: (r: () => void) => {
        set((state: { claim: ClaimQueryMessage }) => {
          return {
            ...state,
            claim: {
              ...state.claim,
              refresh: r,
            },
          };
        });
      },
    })
  )
);
