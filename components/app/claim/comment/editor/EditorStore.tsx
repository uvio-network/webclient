import { create } from "zustand";
import { combine } from "zustand/middleware";

export interface EditorMessage {
  claim: string;
  markdown: string;
};

export const EditorStore = create(
  combine(
    {} as EditorMessage,
    (set) => ({
      delete: () => {
        set(() => {
          return {
            claim: "",
            markdown: "",
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
      updateMarkdown: (m: string) => {
        set((state: EditorMessage) => {
          return {
            ...state,
            markdown: m,
          };
        });
      },
    })
  )
);
