"use client";

import * as React from "react";

import { ClaimObject } from "@/modules/claim/ClaimObject";
import { ClaimVoteValue } from "@/components/claim/ClaimVoteValue";
import { EditorStore } from "@/modules/editor/EditorStore";
import { OverlayInfoCard } from "@/components/card/OverlayInfoCard";
import { QueryStore } from "@/modules/query/QueryStore";
import { SpinnerIcon } from "@/components/icon/SpinnerIcon";
import { SubmitPost } from "@/modules/editor/SubmitPost";
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

  const isDispute = props.claim.lifecycle() === "dispute" ? true : false;
  const isPropose = props.claim.lifecycle() === "propose" ? true : false;
  const isResolve = props.claim.lifecycle() === "resolve" ? true : false;

  const pendingClaim = props.claim.pending();
  const pendingVote = props.claim.latestVote().pending();

  React.useEffect(() => {
    // Note that the pending claim's stake value is managed in the
    // ClaimVoteValue component.
    if (pendingClaim) {
      EditorStore.getState().updateDay(props.claim.expiry().date());
      EditorStore.getState().updateKind("claim");
      EditorStore.getState().updateLabels(props.claim.getPost().labels);
      EditorStore.getState().updateMarkdown(props.claim.getPost().text);
      EditorStore.getState().updateMonth(props.claim.expiry().month() + 1);
      EditorStore.getState().updateOption(true);
      EditorStore.getState().updatePending(true);
      EditorStore.getState().updatePost(props.claim.getPost());
      EditorStore.getState().updatePropose(props.claim);
      EditorStore.getState().updateYear(props.claim.expiry().year());
    }

    if (pendingVote) {
      EditorStore.getState().updateOption(props.claim.latestVote().option());
      EditorStore.getState().updateVote(props.claim.latestVote().getVote());
    }

    if (overlay || pendingVote) {
      if (isResolve) {
        EditorStore.getState().updateKind("truth");
        EditorStore.getState().updatePropose(props.claim.parent()!)
        EditorStore.getState().updateResolve(props.claim)
      } else if (isDispute) {
        EditorStore.getState().updateKind("stake");
        EditorStore.getState().updatePropose(props.claim)
        EditorStore.getState().updateResolve(props.claim.parent()!)
      } else if (isPropose) {
        EditorStore.getState().updateKind("stake");
        EditorStore.getState().updatePropose(props.claim)
      }

      {
        EditorStore.getState().updatePost(props.claim.getPost());
      }
    } else {
      EditorStore.getState().delete();
    }
  }, [props.claim, overlay, isDispute, isPropose, isResolve, pendingClaim, pendingVote]);

  if (!overlay && !pendingClaim && !pendingVote) {
    return <></>;
  }

  return (
    <div className="absolute bottom-12 w-full background">
      <OverlayInfoCard claim={props.claim} />

      <div className="flex gap-x-2 h-14">
        <div className="flex-1 w-full">
          <ClaimVoteValue claim={props.claim} />
        </div>

        <div className="flex-1 w-full">
          <button
            className={`
              flex px-2 py-1 sm:py-4 w-full h-full rounded items-center justify-center
              ${disabled ? "text-gray-700 bg-sky-300 cursor-not-allowed" : "text-gray-900 bg-sky-400 hover:text-black hover:bg-sky-500"}
            `}
            disabled={disabled}
            type="button"
            onClick={() => {
              if (pendingClaim) {
                SubmitPost({
                  after: () => {
                    setProcessing("Confirming Onchain");
                  },
                  before: () => {
                    //
                  },
                  error: () => {
                    setDisabled(false);
                    setProcessing("");
                  },
                  offchain: () => {
                    //
                  },
                  onchain: () => {
                    QueryStore.getState().claim.refresh();

                    setDisabled(false);
                    setProcessing("");

                    EditorStore.getState().delete();
                    TokenStore.getState().updateBalance();
                  },
                  rejected: () => {
                    setDisabled(false);
                    setProcessing("");
                  },
                  valid: () => {
                    setDisabled(true);
                    setProcessing("Signing Transaction");
                  },
                });
              }

              if (overlay || pendingVote) {
                SubmitVote({
                  after: () => {
                    setProcessing("Confirming Onchain");
                  },
                  before: () => {
                    //
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

                    EditorStore.getState().delete();
                    QueryStore.getState().claim.refresh();

                    if (!isResolve) {
                      TokenStore.getState().updateBalance();
                    }
                  },
                  rejected: () => {
                    setDisabled(false);
                    setProcessing("");
                  },
                  valid: () => {
                    setDisabled(true);
                    setProcessing("Signing Transaction");
                  },
                });
              }
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
