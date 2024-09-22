"use client";

import React from "react";

import * as Separator from "@/components/layout/separator";

import { ClaimButtonsStake } from "@/components/claim/ClaimButtonsStake";
import { ClaimButtonsTruth } from "@/components/claim/ClaimButtonsTruth";
import { ClaimFooter } from "@/components/claim/ClaimFooter";
import { ClaimLabels } from "@/components/claim/ClaimLabels";
import { ClaimObject } from "@/modules/claim/ClaimObject";
import { usePathname } from "next/navigation";

interface Props {
  claim: ClaimObject;
}

export const ClaimActions = (props: Props) => {
  const [open, setOpen] = React.useState<string>("");

  const isClaim = props.claim.kind() === "claim" ? true : false;
  const isComment = props.claim.kind() === "comment" ? true : false;
  const isPage = usePathname() === "/claim/" + props.claim.id() ? true : false;
  const isPending = props.claim.pending();
  const isResolve = props.claim.lifecycle() === "resolve";

  return (
    // This relative container is the anchor for elements inside of the
    // ClaimButtons* component. When any of the claim buttons is clicked, we
    // overlay an element to explain some details about staking reputation. And
    // the overlay does only work properly when this div wrapper here provides
    // the anchor with its relative position.
    <div
      className={`
        relative w-full
        ${!isPage && isResolve ? "pb-2" : "py-2"}
        border
        ${open !== "" ? "background-overlay border-color rounded" : "border-background"}
      `}
    >
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

      {(!isPage && (isComment || isResolve)) ? (
        // We want to show the separator on every page, except for resolves that
        // include embeddings on the timeline.
        <></>
      ) : (
        <div className="px-2">
          <Separator.Horizontal margin={!isPage ? "mt-0 mb-2" : !isClaim ? "mt-4 mb-2" : ""} />
        </div>
      )}

      {isClaim && isPage && !isPending && (
        <>
          {isResolve ? (
            <ClaimButtonsTruth
              claim={props.claim}
              open={open}
              setOpen={setOpen}
            />
          ) : (
            <ClaimButtonsStake
              claim={props.claim}
              open={open}
              setOpen={setOpen}
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
