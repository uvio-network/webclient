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
    {
      editor: {} as EditorMessage,
    },
    (set) => ({
      updateExpiry: (e: string) => {
        set((state: { editor: EditorMessage }) => {
          return {
            editor: {
              ...state.editor,
              expiry: e,
            }
          };
        });
      },
      updateLabels: (l: string) => {
        set((state: { editor: EditorMessage }) => {
          return {
            editor: {
              ...state.editor,
              labels: l,
            }
          };
        });
      },
      updateMarkdown: (m: string) => {
        set((state: { editor: EditorMessage }) => {
          return {
            editor: {
              ...state.editor,
              markdown: m,
            }
          };
        });
      },
      updateStake: (s: string) => {
        set((state: { editor: EditorMessage }) => {
          return {
            editor: {
              ...state.editor,
              stake: s,
            }
          };
        });
      },
    })
  )
);
