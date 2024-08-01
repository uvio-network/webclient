import moment from "moment";

import * as React from "react";

import { EditorStore } from "@/components/app/claim/propose/editor/EditorStore";
import { TimeFormat } from "@/modules/app/claim/propose/TimeFormat";

const defaultValue = moment(new Date()).add(1, "hour").startOf("hour").format(TimeFormat);

export const ExpiryField = () => {
  const editor = EditorStore.getState();

  return (
    <div className="basis-3/4" >
      <input
        defaultValue={editor.expiry}
        className="block mr-2 w-full bg-white dark:bg-black outline-none"
        name="expiry"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          editor.updateExpiry(e.currentTarget.value);
        }}
        placeholder={defaultValue}
        type="text"
      />
    </div>
  );
};
