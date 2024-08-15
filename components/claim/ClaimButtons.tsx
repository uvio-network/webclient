"use client";

import * as React from "react";

import { ClaimObject } from "@/modules/claim/ClaimObject";
import { EditorOverlay } from "@/components/app/claim/stake/editor/EditorOverlay";
import { EditorStore } from "@/components/app/claim/stake/editor/EditorStore";
import { QueryStore } from "@/modules/query/QueryStore";
import { StakeButtons } from "@/components/app/claim/stake/editor/StakeButtons";
import { SubmitButton } from "@/components/app/claim/stake/editor/SubmitButton";
import { TokenStore } from "@/modules/token/TokenStore";
import { ValueField } from "@/components/app/claim/stake/field/ValueField";

interface Props {
  claim: ClaimObject;
  open: string;
  setOpen: (open: string) => void;
}

export const ClaimButtons = (props: Props) => {
  const editor = EditorStore.getState();
  const query = QueryStore.getState();

  React.useEffect(() => {
    if (props.open === "") {
      editor.delete();
    } else {
      editor.updateClaim(props.claim.id())
      editor.updateMinimum(props.claim.votes().minimum)
      editor.updateToken(props.claim.token())
    }
  }, [props.claim, props.open, editor]);

  return (
    <>
      {props.open && (
        <>
          <EditorOverlay
            open={props.open}
            setOpen={props.setOpen}
          />

          <div className="flex px-2 h-14">
            <div className="w-full mr-2">
              <ValueField
                setOpen={props.setOpen}
                token={props.claim.token()}
                votes={props.claim.votes()}
              />
            </div>

            <div className="w-full ml-2">
              <SubmitButton
                onSuccess={(vot: string, tok: string, amo: number) => {
                  props.setOpen("");
                  query.claim.refresh();
                  TokenStore.getState().updateAllocated(tok, amo);
                }}
              />
            </div>
          </div>
        </>
      )}

      {!props.open && (
        <StakeButtons setOpen={props.setOpen} />
      )}
    </>
  );
};
