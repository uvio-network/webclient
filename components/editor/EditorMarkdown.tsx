import * as React from "react";

import { ClaimContent } from "@/components/claim/ClaimContent";
import { ClaimObject } from "@/modules/claim/ClaimObject";
import { EditorStore } from "@/modules/editor/EditorStore";
import { RenderMarkdown } from "@/components/markdown/RenderMarkdown";

interface Props {
  claim: ClaimObject | undefined;
  write: boolean;
}

export const EditorMarkdown = (props: Props) => {
  const editor = EditorStore.getState();

  return (
    <div className="flex flex-col w-full">
      {props.write ? (
        <textarea
          className="flex-grow w-full  min-h-72 background placeholder outline-none"
          defaultValue={editor.markdown}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
            editor.updateMarkdown(e.currentTarget.value);
          }}
          placeholder="# Title"
        />
      ) : (
        <RenderMarkdown
          markdown={editor.markdown}
        />
      )}

      {props.claim && (
        <div>
          <div className="my-2 px-2 pt-2 background-overlay rounded border border-color">
            <ClaimContent
              claim={props.claim.id()}
              editor={true}
              embed={true}
              markdown={props.claim.markdown()}
            />
          </div>

          {props.claim.parent() && (
            <div className="my-2 px-2 pt-2 background-overlay rounded border border-color">
              <ClaimContent
                claim={props.claim.parent()!.id()}
                editor={true}
                embed={true}
                markdown={props.claim.parent()!.markdown()}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
