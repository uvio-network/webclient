"use client";

import * as React from "react";

import { ClaimObject } from "@/modules/claim/ClaimObject";
import { EditorOverlay } from "@/components/app/claim/truth/editor/EditorOverlay";
import { EditorStore } from "@/components/app/claim/truth/editor/EditorStore";
import { QueryStore } from "@/modules/query/QueryStore";
import { SpinnerIcon } from "../icon/SpinnerIcon";
import { SubmitForm } from "@/modules/app/claim/truth/SubmitForm";
import { ToTitle } from "@/modules/string/ToTitle";
import { TruthButtons } from "@/components/app/claim/truth/editor/TruthButtons";
import { TruthContext } from "@/modules/context/TruthContext";
import { ValueField } from "@/components/app/claim/truth/field/ValueField";

interface Props {
  claim: ClaimObject;
  open: string;
  setOpen: (open: string) => void;
}

export const ClaimButtonsTruth = (props: Props) => {
  const [disabled, setDisabled] = React.useState<boolean>(false);
  const [processing, setProcessing] = React.useState<string>("");

  const editor = EditorStore.getState();

  React.useEffect(() => {
    if (props.open === "") {
      editor.delete();
    } else {
      editor.updateContract(props.claim.contract())
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

          <div className="flex mb-2 px-2 h-14">
            <div className="w-full">
              <ValueField
                setOpen={props.setOpen}
              />

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
                    valid: (ctx: TruthContext) => {
                      setDisabled(true);
                      setProcessing("Signing Transaction");
                    },
                    error: (ctx: TruthContext) => {
                      setDisabled(false);
                      setProcessing("");
                    },
                    offchain: (ctx: TruthContext) => {
                      //
                    },
                    onchain: (ctx: TruthContext) => {
                      setDisabled(false);
                      setProcessing("");
                      props.setOpen("");
                      QueryStore.getState().claim.refresh();
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
                      Verify with {ToTitle(props.open)}
                    </div>
                  )}
                </>
              </button>
            </div>
          </div>
        </>
      )}

      {!props.open && (
        <TruthButtons
          expired={props.claim.expired()}
          selected={props.claim.selected()}
          setOpen={props.setOpen}
          voted={props.claim.voted()}
        />
      )}
    </>
  );
};
