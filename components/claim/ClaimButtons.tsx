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
import { StakeContext } from "@/modules/context/StakeContext";

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
      editor.updateTree(props.claim.meta()[0])
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
                error={(ctx: StakeContext) => {
                  TokenStore.getState().deleteAllocated(ctx.symbol, ctx.amount);
                }}
                offchain={(ctx: StakeContext) => {
                  props.setOpen("");
                  query.claim.refresh();
                  TokenStore.getState().updateAllocated(ctx.symbol, ctx.amount);
                }}
                onchain={(ctx: StakeContext) => {
                  QueryStore.getState().claim.refresh();
                  TokenStore.getState().updateAvailable();
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
