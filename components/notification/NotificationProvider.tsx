import * as React from "react";

import { NoteSearch } from "@/modules/api/note/search/Search";
import { NotificationObject } from "@/modules/notification/NotificationObject";
import { NotificationStore } from "@/modules/notification/NotificationStore";
import { Sleep } from "@/modules/sleep/Sleep";
import { UserStore } from "@/modules/user/UserStore";
import { useShallow } from "zustand/react/shallow";

export const NotificationProvider = () => {
  const { valid } = UserStore(useShallow((state) => ({
    valid: state.valid,
  })));

  // Continuously check the user's access token in order to update it before it
  // expires.
  React.useEffect(() => {
    let mnt = true;

    const loop = async () => {
      while (mnt) {
        await searchNotes();
        await Sleep(60 * 1000);
      }
    };

    if (valid) {
      loop();
    }

    return () => {
      mnt = false;
    };
  }, [valid]);

  return (
    <></>
  );
};


const searchNotes = async () => {
  const poi = NotificationStore.getState().pointer;
  const tok = UserStore.getState().token;

  if (!poi || poi === 0) {
    // Search for all notes that exist if this is the first time after a page
    // load.

    const pos = await NoteSearch(tok, [{ kind: "*", paging: "page" }]);

    if (pos.length === 0) {
      return;
    }

    const not = pos.map((x) => new NotificationObject(x));

    const srt = not.sort((x, y) => y.created().unix() - x.created().unix());
    const cre = srt[0].created();
    const max = Math.max(...not.map((x) => x.pointer().unix()));
    const unr = not.filter((x) => x.created().unix() > max).length;

    {
      NotificationStore.getState().updateNotifications(srt);
      NotificationStore.getState().updatePointer(cre.unix() + 1);
      NotificationStore.getState().updateUnread(unr);
    }
  } else {
    // Search for notes that we have not yet seen based on a time delta between
    // the latest known pointer and the current time.
    const pos = await NoteSearch(tok, [{ kind: "*", paging: poi.toString() }]);

    if (pos.length === 0) {
      return;
    }

    const not = pos.map((x) => new NotificationObject(x));

    const srt = not.sort((x, y) => y.created().unix() - x.created().unix());
    const cre = srt[0].created();

    {
      NotificationStore.getState().updateNotifications(srt);
      NotificationStore.getState().updatePointer(cre.unix() + 1);
      NotificationStore.getState().updateUnread(srt.length);
    }
  }
};
