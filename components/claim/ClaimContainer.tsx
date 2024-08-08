"use client";

import { ClaimActions } from "@/components/claim/ClaimActions";
import { ClaimContent } from "@/components/claim/ClaimContent";
import { ClaimHeader } from "@/components/claim/ClaimHeader";
import { ClaimObject } from "@/modules/claim/object/ClaimObject";

interface Props {
  claim: ClaimObject;
  embed: boolean;
}

export const ClaimContainer = (props: Props) => {
  return (
    <div className={`${props.claim.kind() === "claim" ? "mb-6" : "mb-2"}`}>
      <div className="p-2 w-full">
        <ClaimHeader claim={props.claim} />
        <ClaimContent claim={props.claim} />
      </div>

      {props.claim.kind() === "comment" && props.embed && (
        <div className="mx-2 mt-2 px-2 pb-2 background-overlay rounded border border-color">
          <ClaimContent
            claim={props.claim.parent()!} // if kind is "comment" then parent() will never be undefined
            embed={props.embed}
          />
        </div>
      )}

      <ClaimActions
        claim={props.claim}
      />
    </div>
  );
};
