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
  setOpen: (open: string) => void;
}

export const StakeButtonsOverlay = (props: Props) => {
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
    <div className="absolute bottom-12 w-full background">
      <div className="relative flex mb-2 p-4 bg-sky-100 dark:bg-sky-900 rounded">
        <div className="w-full text-sm">
          You are staking to <strong>{props.open}</strong> with this claim.
          There is no guarantee of repayment. Learn more at&nbsp;

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
    </div>
  );
};
