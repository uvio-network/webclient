"use client";

import Link from "next/link";

import * as React from "react";

import { HorizontalSeparator } from "@/components/layout/HorizontalSeparator";
import { NoteUpdate } from "@/modules/api/note/update/Update";
import { NotificationObject } from "@/modules/notification/NotificationObject";
import { NotificationStore } from "@/modules/notification/NotificationStore";
import { PageHeader } from "@/components/layout/PageHeader";
import { Sleep } from "@/modules/sleep/Sleep";
import { UserStore } from "@/modules/user/UserStore";
import { useShallow } from "zustand/react/shallow";

export default function Page() {
  const { notifications, pointer, unread } = NotificationStore(useShallow((state) => ({
    notifications: state.notifications,
    pointer: state.pointer,
    unread: state.unread,
  })));

  React.useEffect(() => {
    const update = async () => {
      {
        await NoteUpdate(UserStore.getState().token, [{ pointer: pointer.toString() }]);
      }

      {
        await Sleep(5 * 1000);
      }

      // Set unread to 0 once the notification page has rendered.
      {
        NotificationStore.getState().updateUnread(0);
      }
    };

    if (pointer !== undefined && pointer > 0) {
      update();
    }
  }, [pointer]);

  return (
    <div>
      <PageHeader titl="Notifications" />

      {notifications?.map((x: NotificationObject, i: number) => (
        <div key={x.id()}>
          <div
            className={`
              p-4
              ${i < unread ? "background-overlay" : "background"}
            `}
          >
            <div className="my-auto pb-1 text-gray-500 dark:text-gray-400 text-sm">
              {x.created().format("Do MMM YYYY")}
            </div>

            <div>
              {renMes(x)}
            </div>
          </div>

          {i < notifications.length - 1 && (
            <HorizontalSeparator margin="my-0" />
          )}
        </div>
      ))}
    </div>
  );
};

const renMes = (not: NotificationObject): React.ReactElement => {
  if (not.message() !== "") {
    return <>{not.message()} </>;
  }

  if (not.kind() === "UserRight") {
    return (
      <>
        You staked on Claim {claLin(not)} and where found to be <strong>right</strong>. Onwards!
      </>
    );
  }

  if (not.kind() === "UserWrong") {
    return (
      <>
        You staked on Claim {claLin(not)} and where found to be <strong>wrong</strong>. Maybe next time!
      </>
    );
  }

  if (not.kind() === "UserHonest") {
    return (
      <>
        You voted on Claim {claLin(not)} and where found to be <strong>honest</strong>. Banger!
      </>
    );
  }

  if (not.kind() === "UserDishonest") {
    return (
      <>
        You voted on Claim {claLin(not)} and where found to be <strong>dishonest</strong>. You should reconsider your life choices!
      </>
    );
  }

  if (not.kind() === "UserAbstained") {
    return (
      <>
        You did not vote on Claim {claLin(not)}. That kinda sucks!
      </>
    );
  }

  if (not.kind() === "VoterSelected") {
    return (
      <>
        You have been selected to vote on Claim {claLin(not)}. Please make sure to vote in time!
      </>
    );
  }

  return <></>;
};

const claLin = (not: NotificationObject): React.ReactElement => {
  return (
    <Link
      className="text-blue-600 dark:text-blue-400"
      href={`/claim/${not.resource()}`}
    >
      {not.resource()}
    </Link>
  );
};
