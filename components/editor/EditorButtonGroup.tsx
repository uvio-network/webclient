import Link from "next/link";

import * as React from "react";

import { EditorButton } from "@/components/editor/EditorButton";
import { InfoCircleIcon } from "@/components/icon/InfoCircleIcon";
import { Tooltip } from "@/components/tooltip/Tooltip";

interface Props {
  write: boolean;
  setWrite: (wri: boolean) => void;
}

export const EditorButtonGroup = (props: Props) => {
  return (
    <div className="flex mb-6 w-full items-center">
      <EditorButton
        active={props.write}
        onClick={() => props.setWrite(true)}
        text="Write"
      />

      <EditorButton
        active={!props.write}
        onClick={() => props.setWrite(false)}
        text="Preview"
        tooltip={
          <Tooltip
            content={
              <>
                You can write in markdown. Learn more at&nbsp;

                <Link
                  className="text-blue-600 dark:text-blue-400"
                  href="https://docs.uvio.network/markdown"
                  target="_blank"
                >
                  docs.uvio.network
                </Link>

                .
              </>
            }
            trigger={
              <InfoCircleIcon
                className={`${props.write && "text-gray-400 dark:text-gray-500"}`}
              />
            }
          />
        }
      />
    </div>
  );
};
