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
    {
      user: {} as UserMessage,
    },
    (set) => ({
      delete: () => {
        set(() => {
          return {
            user: {
              object: undefined,
              token: "",
              valid: false,
            },
          };
        });
      },
      update: (u: UserMessage) => {
        set(() => {
          return {
            user: u,
          };
        });
      },
      updateObject: (o: UserObject) => {
        set((state: { user: UserMessage }) => {
          return {
            user: {
              ...state.user,
              object: o,
            }
          };
        });
      },
      updateToken: (t: string) => {
        set((state: { user: UserMessage }) => {
          return {
            user: {
              ...state.user,
              token: t,
            }
          };
        });
      },
    })
  )
);
