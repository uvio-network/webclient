"use client";

import * as React from "react";

import { ClaimObject } from "@/modules/claim/ClaimObject";
import { EditorOverlay } from "@/components/app/claim/truth/editor/EditorOverlay";
import { EditorStore } from "@/components/app/claim/truth/editor/EditorStore";
import { QueryStore } from "@/modules/query/QueryStore";
import { TruthButtons } from "@/components/app/claim/truth/editor/TruthButtons";
import { SubmitButton } from "@/components/app/claim/truth/editor/SubmitButton";
import { TruthContext } from "@/modules/context/TruthContext";
import { ValueField } from "@/components/app/claim/truth/field/ValueField";

interface Props {
  claim: ClaimObject;
  open: string;
  setOpen: (open: string) => void;
}

export const ClaimButtonsTruth = (props: Props) => {
  const editor = EditorStore.getState();
  const query = QueryStore.getState();

  React.useEffect(() => {
    if (props.open === "") {
      editor.delete();
    } else {
      editor.updatePropose(props.claim.parent()!.id())
      editor.updateResolve(props.claim.id())
      editor.updateToken(props.claim.parent()!.token())
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
            <div className="w-full">
              <ValueField
                setOpen={props.setOpen}
              />

              <SubmitButton
                open={props.open}
                error={(ctx: TruthContext) => {
                  //
                }}
                offchain={(ctx: TruthContext) => {
                  props.setOpen("");
                  query.claim.refresh(); // TODO why do we use the different query scope here?
                }}
                onchain={(ctx: TruthContext) => {
                  QueryStore.getState().claim.refresh();
                }}
              />
            </div>
          </div>
        </>
      )}

      {!props.open && (
        <TruthButtons setOpen={props.setOpen} />
      )}
    </>
  );
};
