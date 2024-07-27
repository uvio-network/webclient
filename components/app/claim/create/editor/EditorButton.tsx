import * as React from "react";
import * as Separator from "@/components/app/claim/create/editor/separator";

interface Props {
  active: boolean;
  onClick: () => void;
  text: string;
}

export const EditorButton = (props: Props) => {
  return (
    <button
      className={`
        w-full
        ${props.active && "cursor-default"}
      `}
      onClick={props.onClick}
      type="button"
    >
      <h3 className={`
        pl-2 text-3xl
        ${!props.active && "text-gray-400 dark:text-gray-500"}
      `}>
        {props.text}
      </h3>
      <Separator.Horizontal highlight={props.active} />
    </button>
  );
};
