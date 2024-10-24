"use client";

import * as React from "react";

import { ClaimContent } from "@/components/claim/ClaimContent";
import { ClaimFooter } from "@/components/claim/ClaimFooter";
import { ClaimHeader } from "@/components/claim/ClaimHeader";
import { HorizontalSeparator } from "@/components/layout/HorizontalSeparator";
import { TrimWhitespace } from "@/modules/string/TrimWhitespace";
import { ClaimObject } from "@/modules/claim/ClaimObject";

interface Props {
  comment: ClaimObject;
}

export const CommentContainer = (props: Props) => {
  return (
    <div
      className={TrimWhitespace(`
        relative w-full mb-2
      `)}
    >
      <div className="my-4">
        <ClaimHeader
          claim={props.comment}
          latest={props.comment}
        />
      </div>

      <div className="my-4">
        <ClaimContent
          claim={props.comment.id()}
          editor={false}
          embed={false}
          markdown={props.comment.markdown()}
        />
      </div>

      <div className="relative h-px my-2">
        <HorizontalSeparator
          progress={undefined}
          remaining={undefined}
        />
      </div>

      <ClaimFooter
        claim={props.comment}
      />
    </div>
  );
};
