import Link from "next/link";

import * as React from "react";

import { BaseButton } from "@/components/button/BaseButton";
import { EditorStore } from "@/modules/editor/EditorStore";
import { TrimWhitespace } from "@/modules/string/TrimWhitespace";
import { XMarkIcon } from "@/components/icon/XMarkIcon";

interface Props {
  close: boolean;
  color: "gray" | "red" | "yellow";
  text: React.ReactElement | undefined;
}

export const InfoCard = (props: Props) => {
  return (
    <div
      className={TrimWhitespace(`
        relative flex my-2 p-4 rounded
        ${props.color === "gray" && "background-overlay border border-color"}
        ${props.color === "red" && "bg-rose-400 text-black"}
        ${props.color === "yellow" && "bg-amber-300 text-black"}
      `)}
    >
      <div className="w-full text-sm">
        {props.text && React.cloneElement(props.text, {})}

        {" Learn more at "}

        <Link
          className="text-blue-600 dark:text-blue-400"
          href="https://docs.uvio.network"
          target="_blank"
        >
          docs.uvio.network
        </Link>

        .
      </div>

      {props.close && (
        <div className="absolute top-0 right-0">
          <BaseButton
            background="none"
            color="text-gray-500"
            hover="hover:text-black"
            icon={<XMarkIcon />}
            onClick={() => {
              EditorStore.getState().updateOverlay(false);
            }}
          />
        </div>
      )}
    </div>
  );
};
