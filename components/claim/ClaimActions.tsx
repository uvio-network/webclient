"use client";

import React from "react";

import * as Separator from "@/components/layout/separator";

import { ClaimButtons } from "@/components/claim/ClaimButtons";
import { ClaimFooter } from "@/components/claim/ClaimFooter";
import { ClaimLabels } from "@/components/claim/ClaimLabels";
import { ClaimUpside } from "@/modules/claim/object/ClaimUpside";
import { ClaimVotes } from "@/modules/claim/object/ClaimVotes";
import { usePathname } from "next/navigation";

interface Props {
  claim: string;
  kind: string;
  labels: string[];
  lifecycle: string;
  token: string;
  upside: ClaimUpside;
  votes: ClaimVotes;
}

export const ClaimActions = (props: Props) => {
  const [open, setOpen] = React.useState<string>("");

  const isClaim = props.kind === "claim";
  const isPage = usePathname() === "/claim/" + props.claim ? true : false;

  return (
    // This relative container is the anchor for elements inside of the
    // ClaimButtons component. When any of the claim buttons is clicked, we
    // overlay an element to explain some details about staking reputation. And
    // the overlay does only work properly when this div wrapper here provides
    // the anchor with its relative position.
    <div
      className={`
        relative w-full py-2
        border
        ${open !== "" ? "background-overlay border-color rounded" : "border-background"}
      `}
    >
      {isClaim && isPage && (
        <ClaimLabels
          labels={props.labels}
          lifecycle={props.lifecycle}
        />
      )}

      {/*
      We show the horizontal separator on every page. On the claim page we show
      the claim labels and the claim buttons. Those additional elements have
      margin definitions, that together with the margin of the rendered markdown
      elements cause the claim footer to be more or less far away from the rest
      of the claim content. So on the claim page, we use the default margin of
      the horizontal separator, but on every other page, we restrict the
      separator margin in a way that the claim content and the clainm footer are
      about an equal distance to one another.
      */}
      <div className="px-2">
        <Separator.Horizontal margin={isPage ? "" : "mt-0 mb-2"} />
      </div>

      {isClaim && isPage && (
        <ClaimButtons
          claim={props.claim}
          open={open}
          setOpen={setOpen}
          token={props.token}
          votes={props.votes}
        />
      )}

      <ClaimFooter
        token={props.token}
        upside={props.upside}
        votes={props.votes}
      />
    </div>
  );
};
