import * as React from "react";

import { ClaimObject } from "@/modules/claim/ClaimObject";
import { EditorStore } from "@/modules/editor/EditorStore";
import { InfoCard } from "@/components/card/InfoCard";

interface Props {
  claim: ClaimObject;
}

export const OverlayInfoCard = (props: Props) => {
  const editor = EditorStore.getState();

  const isDispute = props.claim.lifecycle() === "dispute" ? true : false;
  const isPropose = props.claim.lifecycle() === "propose" ? true : false;
  const isResolve = props.claim.lifecycle() === "resolve" ? true : false;

  const isStake = props.claim.latestVote().kind() === "stake" ? true : false;
  const isTruth = props.claim.latestVote().kind() === "truth" ? true : false;

  const pendingClaim = props.claim.pending();
  const pendingVote = props.claim.latestVote().pending();

  const hasMinimum = props.claim.summary().post.minimum > 0;
  const hasVote = props.claim.latestVote().value() > 0;

  return (
    <InfoCard
      close={(!pendingClaim && !pendingVote)}
      color={pendingClaim || pendingVote ? "red" : "blue"}
      text={
        <>
          {(pendingClaim || pendingVote) ? (
            <>
              {pendingClaim && (
                <>
                  Your claim could <strong>not</strong> be confirmed onchain.
                  Please try to submit your

                  {isDispute && " dispute "}
                  {isPropose && " proposal "}

                  {hasMinimum || hasVote ? " once more." : ` once more using your desired amount of ${props.claim.token()} tokens.`}
                </>
              )}

              {pendingVote && !pendingClaim && (
                <>
                  Your

                  {isStake && " stake "}
                  {isTruth && " vote "}

                  could <strong>not</strong> be confirmed onchain.
                  Please try to submit it once more.
                </>
              )}
            </>
          ) : (
            <>
              {isResolve ? (
                <>
                  You are verifing that this claim was in fact <strong>{editor.option ? "True" : "False"}</strong>.
                  Your vote cannot be undone.
                </>
              ) : (
                <>
                  You are staking to <strong>{editor.option ? "Agree" : "Disagree"}</strong> with this claim.
                  There is no guarantee of repayment.
                </>
              )}
            </>
          )}
        </>
      }
    />
  );
};
