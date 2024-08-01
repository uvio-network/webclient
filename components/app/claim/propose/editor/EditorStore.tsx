import { create } from "zustand";
import { combine } from "zustand/middleware";

export interface EditorMessage {
  expiry: string;
  labels: string;
  markdown: string;
  stake: string;
};

export const EditorStore = create(
  combine(
    {} as EditorMessage,
    (set) => ({
      delete: () => {
        set(() => {
          return {
            expiry: "",
            labels: "",
            markdown: "",
            stake: "",
          };
        });
      },
      updateExpiry: (e: string) => {
        set((state: EditorMessage) => {
          return {
            ...state,
            expiry: e,
          };
        });
      },
      updateLabels: (l: string) => {
        set((state: EditorMessage) => {
          return {
            ...state,
            labels: l,
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
      updateStake: (s: string) => {
        set((state: EditorMessage) => {
          return {
            ...state,
            stake: s,
          };
        });
      },
    })
  )
);
