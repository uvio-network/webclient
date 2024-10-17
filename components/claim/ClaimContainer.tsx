"use client";

import * as React from "react";

import { ClaimContent } from "@/components/claim/ClaimContent";
import { ClaimFooter } from "@/components/claim/ClaimFooter";
import { ClaimHeader } from "@/components/claim/ClaimHeader";
import { ClaimLabels } from "@/components/claim/ClaimLabels";
import { ClaimObject } from "@/modules/claim/ClaimObject";
import { ClaimVoteButtons } from "@/components/claim/ClaimVoteButtons";
import { ClaimVoteButtonsOverlay } from "@/components/claim/ClaimVoteButtonsOverlay";
import { HorizontalSeparator } from "@/components/layout/HorizontalSeparator";
import { TrimWhitespace } from "@/modules/string/TrimWhitespace";
import { usePathname } from "next/navigation";
import { UserObject } from "@/modules/user/UserObject";

interface Props {
  claim: ClaimObject;
  user: UserObject | undefined;
}

export const ClaimContainer = (props: Props) => {
  const isClaim = props.claim.kind() === "claim" ? true : false;
  const isOwner = props.user && props.claim.owner().id() === props.user.id() ? true : false;
  const isPage = usePathname() === "/claim/" + props.claim.id() ? true : false;
  const isPending = props.claim.pending();

  return (
    <div
      className={TrimWhitespace(`
        relative w-full
        ${props.claim.kind() === "claim" ? "mb-6" : "mb-2"}
      `)}
    >
      <div className="my-4">
        <ClaimHeader claim={props.claim} />
      </div>

      <div className="my-4">
        <ClaimContent
          claim={props.claim}
          editor={false}
          embed={false}
        />
      </div>

      {props.claim.embed() > 0 && props.claim.parent() && (
        <div className="my-4 px-2 pb-2 background-overlay rounded border border-color">
          <ClaimContent
            claim={props.claim.parent()!}
            editor={false}
            embed={true}
          />
        </div>
      )}

      {props.claim.embed() > 1 && props.claim.parent()?.parent() && (
        <div className="my-4 px-2 pb-2 background-overlay rounded border border-color">
          <ClaimContent
            claim={props.claim.parent()!.parent()!}
            editor={false}
            embed={true}
          />
        </div>
      )}

      {isClaim && isPage && (
        <ClaimLabels
          comment={false}
          labels={props.claim.labels()}
          lifecycle={props.claim.lifecycle()}
          pending={props.claim.pending()}
        />
      )}

      {!isClaim && isPage && props.claim.parent() && (
        <ClaimLabels
          comment={true}
          labels={props.claim.parent()!.labels()}
          lifecycle={props.claim.parent()!.lifecycle()}
          pending={props.claim.parent()!.pending()}
        />
      )}

      <div className="relative h-px my-2">
        <HorizontalSeparator
          progress={props.claim.pending() ? undefined : props.claim.progress()}
          remaining={props.claim.pending() ? undefined : props.claim.remaining()}
        />
      </div>

      {isClaim && isPage && (
        <>
          {!isPending && (
            <ClaimVoteButtons
              claim={props.claim}
              user={props.user}
            />
          )}

          {isPending && isOwner && (
            <ClaimVoteButtonsOverlay
              claim={props.claim}
            />
          )}
        </>
      )}

      <ClaimFooter
        claim={props.claim}
      />
    </div>
  );
};
