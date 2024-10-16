"use client";

import * as React from "react";

import { ClaimObject } from "@/modules/claim/ClaimObject";
import { ClaimVoteValue } from "@/components/claim/ClaimVoteValue";
import { EditorStore } from "@/modules/editor/EditorStore";
import { OverlayInfoCard } from "@/components/card/OverlayInfoCard";
import { QueryStore } from "@/modules/query/QueryStore";
import { SpinnerIcon } from "@/components/icon/SpinnerIcon";
import { SubmitVote } from "@/modules/editor/SubmitVote";
import { TokenStore } from "@/modules/token/TokenStore";
import { ToTitle } from "@/modules/string/ToTitle";
import { useShallow } from "zustand/react/shallow";

interface Props {
  claim: ClaimObject;
}

export const ClaimVoteButtonsOverlay = (props: Props) => {
  const [disabled, setDisabled] = React.useState<boolean>(false);
  const [processing, setProcessing] = React.useState<string>("");

  const { option, overlay } = EditorStore(useShallow((state) => ({
    option: state.option,
    overlay: state.overlay,
  })));

  const editor = EditorStore.getState();

  const isDispute = props.claim.lifecycle() === "dispute" ? true : false;
  const isResolve = props.claim.lifecycle() === "resolve" ? true : false;

  React.useEffect(() => {
    if (overlay) {
      if (isResolve) {
        EditorStore.getState().updateKind("truth");
        editor.updatePropose(props.claim.parent()!)
        editor.updateResolve(props.claim)
      } else if (isDispute) {
        EditorStore.getState().updateKind("stake");
        editor.updatePropose(props.claim)
        editor.updateResolve(props.claim.parent()!)
      } else {
        EditorStore.getState().updateKind("stake");
        editor.updatePropose(props.claim)
      }
    } else {
      editor.delete();
    }
  }, [props.claim, overlay]);

  if (!overlay) {
    return <></>;
  }

  return (
    <div className="absolute bottom-12 w-full background">
      <OverlayInfoCard claim={props.claim} />

      <div className="flex h-14">
        <div className="w-full">
          <ClaimVoteValue claim={props.claim} />

          <button
            className={`
              flex px-2 py-1 sm:py-4 w-full h-full rounded items-center justify-center
              ${disabled ? "text-gray-700 bg-sky-300 cursor-not-allowed" : "text-gray-900 bg-sky-400 hover:text-black hover:bg-sky-500"}
            `}
            disabled={disabled}
            type="button"
            onClick={() => {
              SubmitVote({
                after: () => {
                  setProcessing("Confirming Onchain");
                },
                before: () => {
                  //
                },
                valid: () => {
                  setDisabled(true);
                  setProcessing("Signing Transaction");
                },
                error: () => {
                  setDisabled(false);
                  setProcessing("");
                },
                offchain: () => {
                  //
                },
                onchain: () => {
                  setDisabled(false);
                  setProcessing("");
                  EditorStore.getState().updateOverlay(false);
                  QueryStore.getState().claim.refresh();

                  if (!isResolve) {
                    TokenStore.getState().updateBalance();
                  }
                },
              });
            }}
          >
            <>
              {processing ? (
                <div className="flex gap-x-2">
                  <div className="flex my-auto">
                    <SpinnerIcon textColour="text-gray-700" />
                  </div>

                  <div className="flex">
                    {processing}
                  </div>
                </div>
              ) : (
                <div>
                  {props.claim.pending() ? (
                    <>
                      Propose Claim
                    </>
                  ) : (
                    <>
                      {isResolve ? (
                        <>
                          Verify with {ToTitle(String(option))}
                        </>
                      ) : (
                        <>
                          Stake to {option ? "Agree" : "Disagree"}
                        </>
                      )}
                    </>
                  )}
                </div>
              )}
            </>
          </button>
        </div>
      </div>
    </div>
  );
};
