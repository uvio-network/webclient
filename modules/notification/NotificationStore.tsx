import moment from "moment";

import { combine } from "zustand/middleware";
import { create } from "zustand";
import { NotificationObject } from "@/modules/notification/NotificationObject";

export interface NotificationMessage {
  notifications: NotificationObject[];
  pointer: number;
  unread: number;
};

export const NotificationStore = create(
  combine(
    {} as NotificationMessage,
    (set, get) => ({
      updateNotifications: (n: NotificationObject[]) => {
        set((state: NotificationMessage) => {
          const exi = state.notifications || [];
          const not = n.filter((x) => !exi.some((y) => y.id() === x.id()));

          const all = [...exi, ...not,];
          const srt = all.sort((x, y) => y.created().unix() - x.created().unix());

          return {
            ...state,
            notifications: srt,
          };
        });
      },
      updatePointer: (p: number) => {
        set((state: NotificationMessage) => {
          return {
            ...state,
            pointer: p,
          };
        });
      },
      updateUnread: (n: number) => {
        set((state: NotificationMessage) => {
          const c = get().unread || 0;

          return {
            ...state,
            unread: n === 0 ? n : c + n,
          };
        });
      },
    })
  )
);
