"use client";

import Link from "next/link";

import * as React from "react";

import { ExpiryField } from "@/components/app/claim/propose/field/ExpiryField";
import { LabelsField } from "@/components/app/claim/propose/field/LabelsField";
import { LabelsPreview } from "@/components/app/claim/propose/preview/LabelsPreview";
import { InfoCircleIcon } from "@/components/icon/InfoCircleIcon";
import { MarkdownField } from "@/components/app/claim/propose/field/MarkdownField";
import { MarkdownPreview } from "@/components/app/claim/propose/preview/MarkdownPreview";
import { PageButton } from "@/components/page/PageButton";
import { ProposeContext } from "@/modules/context/ProposeContext";
import { SpinnerIcon } from "@/components/icon/SpinnerIcon";
import { StakeField } from "@/components/app/claim/propose/field/StakeField";
import { SubmitForm } from "@/modules/app/claim/propose/SubmitForm";
import { TokenStore } from "@/modules/token/TokenStore";
import { Tooltip } from "@/components/tooltip/Tooltip";
import { useRouter } from "next/navigation";

export default function Page() {
  const [disabled, setDisabled] = React.useState<boolean>(false);
  const [processing, setProcessing] = React.useState<string>("");
  const [edit, setEdit] = React.useState<boolean>(true);

  const router = useRouter();

  return (
    <div>
      <div className="flex mb-6 w-full items-center">
        <PageButton
          active={edit}
          onClick={() => setEdit(true)}
          text="Write"
        />

        <PageButton
          active={!edit}
          onClick={() => setEdit(false)}
          text="Preview"
          tooltip={
            <Tooltip
              content={
                <>
                  You can write your claim in markdown.
                  Learn more at&nbsp;

                  <Link
                    className="text-blue-600 dark:text-blue-400"
                    href="https://docs.uvio.network/markdown"
                    target="_blank"
                  >
                    docs.uvio.network
                  </Link>

                  .
                </>
              }
              trigger={
                <InfoCircleIcon
                  className={`${edit && "text-gray-400 dark:text-gray-500"}`}
                />
              }
            />
          }
        />
      </div>

      {edit ? (
        <>
          <MarkdownField />
          <LabelsField />
        </>
      ) : (
        <>
          <MarkdownPreview />
          <LabelsPreview />
        </>
      )}

      <div className="flex">
        <div className="basis-3/4">
          <ExpiryField />
        </div>
        <div className="basis-1/4">
          <StakeField />
        </div>
      </div>

      <button
        className={`
          flex items-center justify-center my-1 px-2 py-1 sm:py-4 w-full h-full rounded
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
            valid: (ctx: ProposeContext) => {
              setDisabled(true);
              setProcessing("Signing Transaction");
            },
            error: (ctx: ProposeContext) => {
              setDisabled(false);
              setProcessing("");
              if (ctx.post.id !== "") {
                router.push(`/claim/${ctx.post.id}`);
              }
            },
            offchain: (ctx: ProposeContext) => {
              //
            },
            onchain: (ctx: ProposeContext) => {
              setDisabled(false);
              setProcessing("");
              router.push(`/claim/${ctx.post.id}`);
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
              Propose Claim
            </div>
          )}
        </>
      </button>

      <div className="my-4 p-4 w-full text-sm background-overlay rounded">
        You are about to lock up your funds until this new market resolves.
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
    </div >
  );
};
