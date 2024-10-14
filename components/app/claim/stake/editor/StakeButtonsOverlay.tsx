"use client";

import Link from "next/link";

import * as React from "react";

import { BaseButton } from "@/components/button/BaseButton";
import { ClaimObject } from "@/modules/claim/ClaimObject";
import { EditorStore } from "@/components/app/claim/stake/editor/EditorStore";
import { QueryStore } from "@/modules/query/QueryStore";
import { SpinnerIcon } from "@/components/icon/SpinnerIcon";
import { StakeContext } from "@/modules/context/StakeContext";
import { SubmitForm } from "@/modules/app/claim/stake/SubmitForm";
import { TokenStore } from "@/modules/token/TokenStore";
import { ToTitle } from "@/modules/string/ToTitle";
import { ValueField } from "@/components/app/claim/stake/field/ValueField";
import { XMarkIcon } from "@/components/icon/XMarkIcon";

interface Props {
  claim: ClaimObject;
  open: string;
  pending: boolean;
  setOpen: (open: string) => void;
}

export const StakeButtonsOverlay = (props: Props) => {
  const [disabled, setDisabled] = React.useState<boolean>(false);
  const [processing, setProcessing] = React.useState<string>("");

  const editor = EditorStore.getState();

  React.useEffect(() => {
    if (props.open === "" && !props.pending) {
      editor.delete();
    } else {
      editor.updateClaim(props.claim.id())
      editor.updateContract(props.claim.contract())
      editor.updateToken(props.claim.token())

      // During normal staking, the user decides what side to stake on in
      // advance. If the user for whatever reason fails to propose their claim
      // properly, then we have to provide them with an alternative path to
      // finish their original intention. At the moment we are always setting
      // the side to true when proposing a claim. And so this is what we have to
      // do here as well.
      if (props.pending) {
        const vot = props.claim.getVote();

        if (vot.length === 1) {
          editor.updateMinimum(parseFloat(vot[0].value))
          editor.updateValue(vot[0].value);
        }

        editor.updateOption("true");
      } else {
        editor.updateMinimum(props.claim.summary().post.minimum)
      }
    }
  }, [props.claim, props.open, props.pending, editor]);

  return (
    <div className="absolute bottom-12 w-full background">
      <div
        className={`
          relative flex mb-2 p-4 rounded
          ${props.pending ? "bg-rose-200 dark:bg-rose-900" : "bg-sky-200 dark:bg-sky-900"}
        `}
      >
        <div className="w-full text-sm">
          {props.pending ? (
            <>
              Your claim could <strong>not</strong> be confirmed onchain.
              Please try to finish your proposal again. Learn more at&nbsp;
            </>
          ) : (
            <>
              You are staking to <strong>{props.open}</strong> with this claim.
              There is no guarantee of repayment. Learn more at&nbsp;
            </>
          )}

          <Link
            className="text-blue-600 dark:text-blue-400"
            href="https://docs.uvio.network"
            target="_blank"
          >
            docs.uvio.network
          </Link>

          .
        </div>

        <div className="absolute top-0 right-0">
          <BaseButton
            background="none"
            color="text-gray-500 dark:text-gray-400"
            icon={<XMarkIcon />}
            onClick={() => props.setOpen("")}
          />
        </div>
      </div>

      <div className="flex gap-x-2 h-14">
        <div className="flex-1 w-full">
          <ValueField
            setOpen={props.setOpen}
            summary={props.claim.summary()}
            token={props.claim.token()}
          />
        </div>

        <div className="flex-1 w-full">
          <button
            className={`
              flex items-center justify-center px-2 py-1 sm:py-4 w-full h-full rounded
              ${disabled ? "text-gray-700 bg-sky-300 cursor-not-allowed" : "text-gray-900 bg-sky-400 hover:text-black hover:bg-sky-500"}
            `}
            disabled={disabled}
            type="button"
            onClick={() => {
              SubmitForm({
                pending: props.pending ? props.claim : undefined,
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
                  {props.pending ? (
                    <div>
                      Propose Claim
                    </div>
                  ) : (
                    <div>
                      Stake to {ToTitle(props.open)}
                    </div>
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
