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
    (set, get) => ({
      delete: () => {
        set(() => {
          return {
            day: "",
            labels: "",
            markdown: "",
            month: "",
            stake: "",
            year: "",
          };
        });
      },
      getAmount: (): number => {
        const spl = get().stake.split(" ");

        if (!spl || spl.length !== 2) {
          return 0;
        }

        const str = spl[0];

        if (str === "") {
          return 0;
        }

        return parseFloat(str);
      },
      getToken: (): string => {
        const spl = get().stake.split(" ");

        if (!spl || spl.length !== 2) {
          return "";
        }

        return spl[1];
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
