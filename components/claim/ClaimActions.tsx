"use client";

import React from "react";

import * as Separator from "@/components/layout/separator";

import { ClaimButtons } from "@/components/claim/ClaimButtons";
import { ClaimFooter } from "@/components/claim/ClaimFooter";
import { ClaimLabels } from "@/components/claim/ClaimLabels";
import { ClaimStake } from "@/modules/claim/object/ClaimStake";

interface Props {
  labels: string[];
  lifecycle: string;
  stake: ClaimStake;
  token: string;
}

export const ClaimActions = (props: Props) => {
  const [show, setShow] = React.useState<string>("");

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
        ${show !== "" ? "border-color rounded background-overlay" : "border-background"}
      `}
    >
      <ClaimLabels labels={props.labels} lifecycle={props.lifecycle} />

      <div className="px-2">
        <Separator.Horizontal />
      </div>

      <ClaimButtons
        setShow={setShow}
        show={show}
      />

      <ClaimFooter stake={props.stake} token={props.token} />
    </div>
  );
};
