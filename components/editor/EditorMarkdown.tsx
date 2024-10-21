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

  if (props.write) {
    return (
      <textarea
        className="block w-full min-h-96 background placeholder outline-none"
        defaultValue={editor.markdown}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
          editor.updateMarkdown(e.currentTarget.value);
        }}
        placeholder="# Title"
      />
    );
  };

  return (
    <div className="w-full min-h-96">
      <RenderMarkdown
        markdown={editor.markdown}
      />

      {props.claim && (
        <div>
          <div className="m-2 px-2 pb-2 background-overlay rounded border border-color">
            <ClaimContent
              claim={props.claim.id()}
              editor={true}
              embed={true}
              markdown={props.claim.markdown()}
            />
          </div>

          {props.claim.parent() && (
            <div className="m-2 px-2 pb-2 background-overlay rounded border border-color">
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
