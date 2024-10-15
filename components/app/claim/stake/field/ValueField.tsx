import * as React from "react";

import { EditorStore } from "@/components/app/claim/stake/editor/EditorStore";
import { Summary } from "@/modules/summary/Summary";
import { TrimWhitespace } from "@/modules/string/TrimWhitespace";
import { useShallow } from "zustand/react/shallow";

interface Props {
  pending: boolean;
  setOpen: (open: string) => void;
  summary: Summary;
  token: string;
}

export const ValueField = (props: Props) => {
  const { minimum } = EditorStore(useShallow((state) => ({
    minimum: state.minimum,
  })));

  const editor = EditorStore.getState();

  return (
    <input
      className={TrimWhitespace(`
        w-full h-full p-2 bg-transparent
        border-b-2 border-sky-400 outline-none
        placeholder:text-gray-400 placeholder:dark:text-gray-500
        text-2xl sm:text-4xl font-light text-right caret-sky-400
      `)}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        editor.updateValue(e.currentTarget.value);
      }}
      onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Escape") props.setOpen("");
      }}
      placeholder={`${props.summary.post.minimum || minimum || 10} ${props.token}`}
      defaultValue={props.pending && minimum ? `${minimum} ${props.token}` : undefined}
      autoFocus={true}
      type="text"
    />
  );
};
