"use client";

import { ClaimActions } from "@/components/claim/ClaimActions";
import { ClaimContent } from "@/components/claim/ClaimContent";
import { ClaimHeader } from "@/components/claim/ClaimHeader";
import { ClaimObject } from "@/modules/claim/ClaimObject";

interface Props {
  claim: ClaimObject;
}

export const ClaimContainer = (props: Props) => {
  return (
    <div className={`${props.claim.kind() === "claim" ? "mb-6" : "mb-2"}`}>
      <div className="mt-2 px-2">
        <ClaimHeader claim={props.claim} />

        <ClaimContent
          claim={props.claim}
          editor={false}
          embed={false}
        />
      </div>

      {props.claim.embed() > 0 && props.claim.parent() && (
        <div className="mx-2 mt-4 mb-1 px-2 pb-2 background-overlay rounded border border-color">
          <ClaimContent
            claim={props.claim.parent()!}
            editor={false}
            embed={true}
          />
        </div>
      )}

      {props.claim.embed() > 1 && props.claim.parent()?.parent() && (
        <div className="mx-2 mt-4 mb-1 px-2 pb-2 background-overlay rounded border border-color">
          <ClaimContent
            claim={props.claim.parent()!.parent()!}
            editor={false}
            embed={true}
          />
        </div>
      )}

      <ClaimActions
        claim={props.claim}
      />
    </div>
  );
};
