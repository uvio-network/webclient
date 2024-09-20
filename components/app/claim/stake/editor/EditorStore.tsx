import { Address } from "viem";
import { create } from "zustand";
import { combine } from "zustand/middleware";

export interface EditorMessage {
  claim: string;
  contract: Address;
  minimum: number;
  option: boolean;
  token: string;
  value: string;
};

export const EditorStore = create(
  combine(
    {} as EditorMessage,
    (set) => ({
      delete: () => {
        set(() => {
          return {
            claim: "",
            contract: "0x0",
            minimum: 0,
            option: false,
            token: "",
            value: "",
          };
        });
      },
      updateClaim: (c: string) => {
        set((state: EditorMessage) => {
          return {
            ...state,
            claim: c,
          };
        });
      },
      updateContract: (c: Address) => {
        set((state: EditorMessage) => {
          return {
            ...state,
            contract: c,
          };
        });
      },
      updateMinimum: (m: number) => {
        set((state: EditorMessage) => {
          return {
            ...state,
            minimum: m,
          };
        });
      },
      updateOption: (o: string) => {
        set((state: EditorMessage) => {
          return {
            ...state,
            option: o.toLowerCase() === "true",
          };
        });
      },
      updateToken: (t: string) => {
        set((state: EditorMessage) => {
          return {
            ...state,
            token: t,
          };
        });
      },
      updateValue: (v: string) => {
        set((state: EditorMessage) => {
          return {
            ...state,
            value: v,
          };
        });
      },
    })
  )
);
