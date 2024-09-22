"use client";

import { ClaimActions } from "@/components/claim/ClaimActions";
import { ClaimContent } from "@/components/claim/ClaimContent";
import { ClaimHeader } from "@/components/claim/ClaimHeader";
import { ClaimObject } from "@/modules/claim/ClaimObject";
import { usePathname } from "next/navigation";

interface Props {
  claim: ClaimObject;
}

export const ClaimContainer = (props: Props) => {
  return (
    <div className={`${props.claim.kind() === "claim" ? "mb-6" : "mb-2"}`}>
      <div className="p-2 w-full">
        <ClaimHeader claim={props.claim} />
        <ClaimContent claim={props.claim} embed={false} />
      </div>

      {/*
      We want to render embedded claims for every comment, if embedding is
      enabled by the caller. For instance, we do not want to embed parent claims
      when rendering comments on the claim page, because the parent claim is
      already rendered at the top of the claim page. And so in this case, we
      want to only render comments in a simplified version, without embedding.
      */}
      {props.claim.embed() > 0 && props.claim.parent() && ((props.claim.lifecycle() === "resolve") || props.claim.kind() === "comment") && (
        <div className="m-2 px-2 pb-2 background-overlay rounded border border-color">
          <ClaimContent
            claim={props.claim.parent()!}
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
