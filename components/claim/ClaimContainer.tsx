"use client";

import * as React from "react";
import * as Separator from "@/components/layout/separator";

import { ClaimContent } from "@/components/claim/ClaimContent";
import { ClaimFooter } from "@/components/claim/ClaimFooter";
import { ClaimHeader } from "@/components/claim/ClaimHeader";
import { ClaimLabels } from "@/components/claim/ClaimLabels";
import { ClaimObject } from "@/modules/claim/ClaimObject";
import { StakeButtons } from "@/components/app/claim/stake/editor/StakeButtons";
import { StakeButtonsOverlay } from "@/components/app/claim/stake/editor/StakeButtonsOverlay";
import { TrimWhitespace } from "@/modules/string/TrimWhitespace";
import { TruthButtons } from "@/components/app/claim/truth/editor/TruthButtons";
import { TruthButtonsOverlay } from "@/components/app/claim/truth/editor/TruthButtonsOverlay";
import { usePathname } from "next/navigation";

interface Props {
  claim: ClaimObject;
}

export const ClaimContainer = (props: Props) => {
  const [open, setOpen] = React.useState<string>("");

  const isClaim = props.claim.kind() === "claim" ? true : false;
  const isPage = usePathname() === "/claim/" + props.claim.id() ? true : false;
  const isPending = props.claim.pending();
  const isResolve = props.claim.lifecycle() === "resolve";

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
        <Separator.Horizontal
          progress={props.claim.pending() ? undefined : props.claim.progress()}
          remaining={props.claim.pending() ? undefined : props.claim.remaining()}
        />
      </div>

      {isClaim && isPage && !isPending && (
        <>
          {isResolve ? (
            <>
              <TruthButtons
                expired={props.claim.expired()}
                selected={props.claim.selected()}
                setOpen={setOpen}
                voted={props.claim.voted()}
              />

              {open && (
                <TruthButtonsOverlay
                  claim={props.claim}
                  open={open}
                  setOpen={setOpen}
                />
              )}
            </>
          ) : (
            <>
              <StakeButtons
                expired={props.claim.expired()}
                setOpen={setOpen}
              />

              {open && (
                <StakeButtonsOverlay
                  claim={props.claim}
                  open={open}
                  setOpen={setOpen}
                />
              )}
            </>
          )}
        </>
      )}

      <ClaimFooter
        claim={props.claim}
      />
    </div>
  );
};
