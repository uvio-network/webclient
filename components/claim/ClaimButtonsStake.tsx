"use client";

import * as React from "react";

import { ClaimObject } from "@/modules/claim/ClaimObject";
import { EditorOverlay } from "@/components/app/claim/stake/editor/EditorOverlay";
import { EditorStore } from "@/components/app/claim/stake/editor/EditorStore";
import { QueryStore } from "@/modules/query/QueryStore";
import { StakeContext } from "@/modules/context/StakeContext";
import { StakeButtons } from "@/components/app/claim/stake/editor/StakeButtons";
import { SpinnerIcon } from "@/components/icon/SpinnerIcon";
import { SubmitForm } from "@/modules/app/claim/stake/SubmitForm";
import { TokenStore } from "@/modules/token/TokenStore";
import { ToTitle } from "@/modules/string/ToTitle";
import { ValueField } from "@/components/app/claim/stake/field/ValueField";

interface Props {
  claim: ClaimObject;
  open: string;
  setOpen: (open: string) => void;
}

export const ClaimButtonsStake = (props: Props) => {
  const [disabled, setDisabled] = React.useState<boolean>(false);
  const [processing, setProcessing] = React.useState<string>("");

  const editor = EditorStore.getState();

  React.useEffect(() => {
    if (props.open === "") {
      editor.delete();
    } else {
      editor.updateClaim(props.claim.id())
      editor.updateContract(props.claim.contract())
      editor.updateMinimum(props.claim.summary().post.minimum)
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

          <div className="flex mb-2 px-2 h-14">
            <div className="w-full mr-2">
              <ValueField
                setOpen={props.setOpen}
                summary={props.claim.summary()}
                token={props.claim.token()}
              />
            </div>

            <div className="w-full ml-2">
              <button
                className={`
                  flex items-center justify-center px-2 py-1 sm:py-4 w-full min-h-14 rounded
                  ${disabled ? "text-gray-700 bg-sky-300 cursor-not-allowed" : "text-gray-900 bg-sky-400 hover:text-black hover:bg-sky-500"}
                `}
                disabled={disabled}
                type="button"
                onClick={() => {
                  SubmitForm({
                    after: () => {
                      setProcessing("Confirming Onchain");
                    },
                    before: () => {
                      //
                    },
                    valid: (ctx: StakeContext) => {
                      setDisabled(true);
                      setProcessing("Signing Transaction");
                    },
                    error: (ctx: StakeContext) => {
                      setDisabled(false);
                      setProcessing("");
                    },
                    offchain: (ctx: StakeContext) => {
                      //
                    },
                    onchain: (ctx: StakeContext) => {
                      setDisabled(false);
                      setProcessing("");
                      props.setOpen("");
                      QueryStore.getState().claim.refresh();
                      TokenStore.getState().updateBalance();
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
                      Stake to {ToTitle(props.open)}
                    </div>
                  )}
                </>
              </button>
            </div>
          </div>
        </>
      )}

      {!props.open && (
        <StakeButtons
          expired={props.claim.expired()}
          setOpen={props.setOpen}
        />
      )}
    </>
  );
};
