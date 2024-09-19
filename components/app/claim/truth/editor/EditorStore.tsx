import { create } from "zustand";
import { combine } from "zustand/middleware";

export interface EditorMessage {
  option: boolean;
  propose: string;
  resolve: string;
  token: string;
};

export const EditorStore = create(
  combine(
    {} as EditorMessage,
    (set) => ({
      delete: () => {
        set(() => {
          return {
            claim: "",
            option: false,
            token: "",
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
      updatePropose: (p: string) => {
        set((state: EditorMessage) => {
          return {
            ...state,
            propose: p,
          };
        });
      },
      updateResolve: (r: string) => {
        set((state: EditorMessage) => {
          return {
            ...state,
            resolve: r,
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
    })
  )
);
