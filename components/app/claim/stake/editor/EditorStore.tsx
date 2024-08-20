import { create } from "zustand";
import { combine } from "zustand/middleware";

export interface EditorMessage {
  claim: string;
  minimum: number;
  option: boolean;
  token: string;
  tree: string;
  value: string;
};

export const EditorStore = create(
  combine(
    {} as EditorMessage,
    (set, get) => ({
      delete: () => {
        set(() => {
          return {
            claim: "",
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
      updateTree: (t: string) => {
        set((state: EditorMessage) => {
          return {
            ...state,
            tree: t,
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
