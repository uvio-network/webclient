"use client";

import * as React from "react";

import { ClaimObject } from "@/modules/claim/ClaimObject";
import { ClaimVoteValue } from "@/components/claim/ClaimVoteValue";
import { EditorStore } from "@/modules/editor/EditorStore";
import { FormatDay } from "@/modules/time/Time";
import { FormatMonth } from "@/modules/time/Time";
import { OverlayInfoCard } from "@/components/card/OverlayInfoCard";
import { QueryStore } from "@/modules/query/QueryStore";
import { SpinnerIcon } from "@/components/icon/SpinnerIcon";
import { SubmitPost } from "@/modules/editor/SubmitPost";
import { SuccessReceipt } from "@/modules/wallet/WalletInterface";
import { SubmitVote } from "@/modules/editor/SubmitVote";
import { TokenStore } from "@/modules/token/TokenStore";
import { ToTitle } from "@/modules/string/ToTitle";
import { useShallow } from "zustand/react/shallow";
import { TrimWhitespace } from "@/modules/string/TrimWhitespace";

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

  React.useEffect(() => {
    if (props.claim.pending()) {
      // Note that the pending claim's stake value is managed in the
      // ClaimVoteValue component.

      {
        EditorStore.getState().updateDay(FormatDay(props.claim.expiry().date()));
        EditorStore.getState().updateKind("claim");
        EditorStore.getState().updateLabels(props.claim.getPost().labels);
        EditorStore.getState().updateMarkdown(props.claim.getPost().text);
        EditorStore.getState().updateMonth(FormatMonth(props.claim.expiry().month()));
        EditorStore.getState().updateOption(true);
        EditorStore.getState().updatePending(true);
        EditorStore.getState().updatePost(props.claim.getPost());
        EditorStore.getState().updatePropose(props.claim);
        EditorStore.getState().updateYear(props.claim.expiry().year().toString());
      }

      if (props.claim.latestVote().pending()) {
        EditorStore.getState().updateVote(props.claim.latestVote().getVote());
      }
    } else {
      // Note that we must prioritize the confirmation of a pending claim over
      // everything else. So only if the given claim is not pending, only then
      // can we go ahead to ensure pending votes or deal with stakes and votes.

      // If the claim is not pending, then that means that we deposited tokens
      // already into a smart contract. If the latest vote is then still
      // pending, then that means we need to update the pending vote with the
      // hash of the confirmed claim, without doing any more contract writes.
      if (props.claim.patchVote()) {
        EditorStore.getState().updateOption(true);
        EditorStore.getState().updatePatch(true);
        EditorStore.getState().updateReceipt(SuccessReceipt(props.claim.hash()));
        EditorStore.getState().updateVote(props.claim.latestVote().getVote());
      } else if (props.claim.latestVote().pending()) {
        EditorStore.getState().updateOption(props.claim.latestVote().option());
        EditorStore.getState().updatePending(true);
        EditorStore.getState().updateVote(props.claim.latestVote().getVote());
      }

      if (overlay || props.claim.patchVote() || props.claim.latestVote().pending()) {
        if (props.claim.isResolve()) {
          EditorStore.getState().updateKind("truth");
          EditorStore.getState().updatePost(props.claim.parent()!.getPost());
          EditorStore.getState().updatePropose(props.claim.parent()!)
          EditorStore.getState().updateResolve(props.claim)
        } else if (props.claim.isDispute()) {
          EditorStore.getState().updateKind("stake");
          EditorStore.getState().updatePost(props.claim.getPost());
          EditorStore.getState().updatePropose(props.claim)
          EditorStore.getState().updateResolve(props.claim.parent()!)
        } else if (props.claim.isPropose()) {
          EditorStore.getState().updateKind("stake");
          EditorStore.getState().updatePost(props.claim.getPost());
          EditorStore.getState().updatePropose(props.claim)
        }
      }
    }

    if (!overlay && !props.claim.pending() && !props.claim.latestVote().pending()) {
      EditorStore.getState().delete();
    }
  }, [props.claim, overlay]);

  if (!overlay && !props.claim.pending() && !props.claim.latestVote().pending()) {
    return <></>;
  }

  return (
    <div className="absolute bottom-12 w-full background">
      <OverlayInfoCard claim={props.claim} />

      <div
        className={TrimWhitespace(`
          flex h-14
          ${!props.claim.isResolve() ? "gap-x-2 " : ""}
        `)}
      >
        <div className={!props.claim.isResolve() ? "flex-1 w-full" : ""}>
          <ClaimVoteValue claim={props.claim} />
        </div>

        <div className="flex-1 w-full">
          <button
            className={TrimWhitespace(`
              flex px-2 py-4 w-full h-full
              rounded items-center justify-center
              ${disabled ? "text-gray-700 bg-sky-300 cursor-not-allowed" : "text-gray-900 bg-sky-400 hover:text-black hover:bg-sky-500"}
            `)}
            disabled={disabled}
            type="button"
            onClick={() => {
              if (props.claim.pending()) {
                SubmitPost({
                  after: () => {
                    setProcessing("Confirming Onchain");
                  },
                  before: () => {
                    //
                  },
                  error: () => {
                    // We do not delete the editor state on errors, but instead
                    // only refresh the query for the claim that we are working
                    // on right now. This has the effect that the user will be
                    // prompted to complete their originally intended action, so
                    // that most of the broken state that we can anticipate gets
                    // fixed immediately.
                    QueryStore.getState().claim.refresh();

                    setDisabled(false);
                    setProcessing("");

                    if (!props.claim.isResolve()) {
                      TokenStore.getState().updateBalance();
                    }
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
              } else if (overlay || props.claim.patchVote() || props.claim.latestVote().pending()) {
                SubmitVote({
                  after: () => {
                    setProcessing("Confirming Onchain");
                  },
                  before: () => {
                    //
                  },
                  error: () => {
                    // We do not delete the editor state on errors, but instead
                    // only refresh the query for the claim that we are working
                    // on right now. This has the effect that the user will be
                    // prompted to complete their originally intended action, so
                    // that most of the broken state that we can anticipate gets
                    // fixed immediately.
                    QueryStore.getState().claim.refresh();

                    setDisabled(false);
                    setProcessing("");

                    if (!props.claim.isResolve()) {
                      TokenStore.getState().updateBalance();
                    }
                  },
                  offchain: () => {
                    //
                  },
                  onchain: () => {
                    QueryStore.getState().claim.refresh();

                    setDisabled(false);
                    setProcessing("");

                    EditorStore.getState().delete();

                    if (!props.claim.isResolve()) {
                      TokenStore.getState().updateBalance();
                    }
                  },
                  rejected: () => {
                    setDisabled(false);
                    setProcessing("");
                  },
                  valid: () => {
                    setDisabled(true);
                    if (props.claim.patchVote()) {
                      setProcessing(`Submitting ${EditorStore.getState().kind === "stake" ? "Stake" : "Vote"}`);
                    } else {
                      setProcessing("Signing Transaction");
                    }
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
                      {props.claim.isResolve() ? (
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
