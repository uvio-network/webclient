import { create } from "zustand";
import { combine } from "zustand/middleware";

export interface EditorMessage {
  day: string;
  labels: string;
  markdown: string;
  month: string;
  stake: string;
  year: string;
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
      updateDay: (d: string) => {
        set((state: EditorMessage) => {
          return {
            ...state,
            day: d,
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
      updateMonth: (m: string) => {
        set((state: EditorMessage) => {
          return {
            ...state,
            month: m,
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
      updateYear: (y: string) => {
        set((state: EditorMessage) => {
          return {
            ...state,
            year: y,
          };
        });
      },
    })
  )
);
