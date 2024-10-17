import { create } from "zustand";
import { combine } from "zustand/middleware";
import { UserObject } from "@/modules/user/UserObject";

export interface UserMessage {
  object: UserObject | undefined;
  token: string;
  valid: boolean;
};

export const UserStore = create(
  combine(
    {} as UserMessage,
    (set) => ({
      delete: () => {
        set(() => {
          return {
            object: undefined,
            token: "",
            valid: false,
          };
        });
      },
      update: (u: UserMessage) => {
        set(() => {
          return u;
        });
      },
      updateObject: (o: UserObject) => {
        set((state: UserMessage) => {
          return {
            ...state,
            object: o,
          };
        });
      },
      updateToken: (t: string) => {
        set((state: UserMessage) => {
          return {
            ...state,
            token: t,
          };
        });
      },
    })
  )
);
