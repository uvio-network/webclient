import * as React from "react";

import { LoadingStore } from "@/components/loading/LoadingStore";
import { TrimWhitespace } from "@/modules/string/TrimWhitespace";

interface Props {
  active: boolean;
  onClick: () => void;
  text: string;
  tooltip?: React.ReactElement;
}

export const EditorButton = (props: Props) => {
  const { loaded } = LoadingStore();

  if (!loaded) {
    return <></>;
  }

  return (
    <button
      className={TrimWhitespace(`
        flex gap-x-2 p-2 w-full
        items-center outline-none
        ${props.active ? "border-b-2 border-sky-400" : "border-b-2 border-transparent"}
        ${props.active ? "cursor-default" : ""}
      `)}
      onClick={props.onClick}
      type="button"
    >
      <h3
        className={TrimWhitespace(`
          text-3xl
          ${!props.active ? "text-gray-400 dark:text-gray-500" : ""}
        `)}
      >
        {props.text}
      </h3>

      {props.tooltip && (
        <div className="flex items-center">
          {React.cloneElement(props.tooltip, {})}
        </div>
      )}
    </button>
  );
};
