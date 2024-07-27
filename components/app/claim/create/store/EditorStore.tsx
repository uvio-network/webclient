import { create } from "zustand";
import { combine } from "zustand/middleware";

export interface EditorMessage {
  labels: string;
  markdown: string;
};

export const EditorStore = create(
  combine(
    {
      editor: {} as EditorMessage,
    },
    (set) => ({
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
    })
  )
);
