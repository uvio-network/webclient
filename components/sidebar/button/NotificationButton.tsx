"use client";

import Link from "next/link";

import * as React from "react";
import * as ToastSender from "@/components/toast/ToastSender";

import { BaseButton } from "@/components/button/BaseButton";
import { NotificationIcon } from "@/components/icon/NotificationIcon";
import { NotificationStore } from "@/modules/notification/NotificationStore";
import { UserStore } from "@/modules/user/UserStore";
import { useShallow } from "zustand/react/shallow";

interface Props {
  onClick: () => void;
}

export const NotificationButton = (props: Props) => {
  const { unread } = NotificationStore(useShallow((state) => ({
    unread: state.unread,
  })));

  const { valid } = UserStore(useShallow((state) => ({
    valid: state.valid,
  })));

  const onClick = (e: React.MouseEvent) => {
    if (!valid) {
      e.preventDefault();
      ToastSender.Info("You need to login to see notifications.");
    }

    props.onClick();
  };

  return (
    <Link
      href="/notifications"
      onClick={onClick}
    >
      <BaseButton
        color={unread > 0 ? "text-blue-400" : undefined}
        icon={
          <NotificationIcon
            className={unread > 0 ? "text-blue-400" : undefined}
            unread={unread > 0}
          />
        }
        text={<>{butTit(unread)}</>}
      />
    </Link>
  );
};

const butTit = (unr: number): string => {
  if (unr === 1) {
    return "1 Notification";
  }

  if (unr > 1) {
    return unr.toString() + " Notifications";
  }

  return "Notifications";
};
