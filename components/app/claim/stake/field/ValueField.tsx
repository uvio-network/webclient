import * as React from "react";

import { EditorStore } from "@/components/app/claim/stake/editor/EditorStore";
import { Summary } from "@/modules/summary/Summary";

interface Props {
  setOpen: (open: string) => void;
  summary: Summary;
  token: string;
}

export const ValueField = (props: Props) => {
  const editor = EditorStore.getState();

  return (
    <input
      className={`
        w-full h-full
        background-overlay outline-none
        placeholder:text-gray-400 placeholder:dark:text-gray-500
        text-2xl sm:text-4xl font-light text-right caret-blue-400
      `}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        editor.updateValue(e.currentTarget.value);
      }}
      onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Escape") props.setOpen("");
      }}
      placeholder={`${props.summary.post.minimum} ${props.token}`}
      autoFocus={true}
      type="text"
    />
  );
};
