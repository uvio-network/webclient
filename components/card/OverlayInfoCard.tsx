import * as React from "react";

import { ClaimObject } from "@/modules/claim/ClaimObject";
import { EditorStore } from "@/modules/editor/EditorStore";
import { InfoCard } from "@/components/card/InfoCard";
import { ToTitle } from "@/modules/string/ToTitle";

interface Props {
  claim: ClaimObject;
}

export const OverlayInfoCard = (props: Props) => {
  const editor = EditorStore.getState();

  return (
    <InfoCard
      close={true}
      color={props.claim.pending() ? "red" : "blue"}
      text={
        <>
          {props.claim.pending() ? (
            <>
              Your claim could <strong>not</strong> be confirmed onchain.
              Please try to finish your proposal once more.
            </>
          ) : (
            <>
              {props.claim.lifecycle() === "resolve" ? (
                <>
                  You are verifing that this claim was in fact <strong>{ToTitle(String(editor.option))}</strong>.
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
