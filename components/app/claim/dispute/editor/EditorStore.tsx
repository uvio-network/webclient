import { create } from "zustand";
import { combine } from "zustand/middleware";

export interface EditorMessage {
  amount: number;
  day: string;
  labels: string;
  markdown: string;
  month: string;
  option: boolean;
  propose: string;
  resolve: string;
  token: string;
  year: string;
};

export const EditorStore = create(
  combine(
    {} as EditorMessage,
    (set, get) => ({
      delete: () => {
        set(() => {
          return {
            amount: 0,
            day: "",
            labels: "",
            markdown: "",
            month: "",
            option: false,
            propose: "",
            resolve: "",
            token: "",
            year: "",
          };
        });
      },
      updateAmount: (a: number) => {
        set((state: EditorMessage) => {
          return {
            ...state,
            amount: a,
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
      updateOption: (o: boolean) => {
        set((state: EditorMessage) => {
          return {
            ...state,
            option: o,
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
