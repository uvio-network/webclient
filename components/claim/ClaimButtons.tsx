"use client";

import * as React from "react";

import { ClaimVotes } from "@/modules/claim/object/ClaimVotes";
import { EditorOverlay } from "@/components/app/claim/stake/editor/EditorOverlay";
import { EditorStore } from "@/components/app/claim/stake/editor/EditorStore";
import { QueryStore } from "@/modules/query/QueryStore";
import { StakeButtons } from "@/components/app/claim/stake/editor/StakeButtons";
import { SubmitButton } from "@/components/app/claim/stake/editor/SubmitButton";
import { ValueField } from "@/components/app/claim/stake/field/ValueField";

interface Props {
  claim: string;
  open: string;
  setOpen: (open: string) => void;
  token: string;
  votes: ClaimVotes;
}

export const ClaimButtons = (props: Props) => {
  const editor = EditorStore.getState();
  const query = QueryStore.getState();

  React.useEffect(() => {
    if (props.open === "") {
      editor.delete();
    } else {
      editor.updateClaim(props.claim)
      editor.updateMinimum(props.votes.minimum)
      editor.updateToken(props.token)
    }
  }, [props.open, editor]);

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
                token={props.token}
                votes={props.votes}
              />
            </div>

            <div className="w-full ml-2">
              <SubmitButton
                onSuccess={() => {
                  props.setOpen("");
                  query.claim.refresh();
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
