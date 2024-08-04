"use client";

import React from "react";

import * as Separator from "@/components/layout/separator";

import { ClaimButtons } from "@/components/claim/ClaimButtons";
import { ClaimFooter } from "@/components/claim/ClaimFooter";
import { ClaimLabels } from "@/components/claim/ClaimLabels";
import { ClaimUpside } from "@/modules/claim/object/ClaimUpside";
import { ClaimVotes } from "@/modules/claim/object/ClaimVotes";

interface Props {
  labels: string[];
  lifecycle: string;
  token: string;
  upside: ClaimUpside;
  votes: ClaimVotes;
}

export const ClaimActions = (props: Props) => {
  const [open, setOpen] = React.useState<string>("");

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
      <ClaimLabels
        labels={props.labels}
        lifecycle={props.lifecycle}
      />

      <div className="px-2">
        <Separator.Horizontal />
      </div>

      <ClaimButtons
        open={open}
        setOpen={setOpen}
        token={props.token}
        votes={props.votes}
      />

      <ClaimFooter
        token={props.token}
        upside={props.upside}
        votes={props.votes}
      />
    </div>
  );
};
