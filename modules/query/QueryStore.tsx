import { combine } from "zustand/middleware";
import { create } from "zustand";
import { QueryClient } from "@tanstack/react-query";

export interface RefreshMessage {
  refresh: () => void;
};

export interface QueryMessage {
  client: QueryClient;
};

const newQueryMessage = (): QueryMessage => {
  return {
    client: new QueryClient(),
  };
};

export const QueryStore = create(
  combine(
    {
      claim: {} as RefreshMessage,
      query: newQueryMessage(),
    },
    (set) => ({
      updateClaim: (f: () => void) => {
        set(() => {
          return {
            claim: {
              refresh: f,
            },
          };
        });
      },
    })
  )
);
