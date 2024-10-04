"use client";

import Link from "next/link";

import * as React from "react";

import { ExpiryField } from "@/components/app/claim/propose/field/ExpiryField";
import { LabelsField } from "@/components/app/claim/propose/field/LabelsField";
import { LabelsPreview } from "@/components/app/claim/propose/preview/LabelsPreview";
import { MarkdownField } from "@/components/app/claim/propose/field/MarkdownField";
import { MarkdownPreview } from "@/components/app/claim/propose/preview/MarkdownPreview";
import { PageButton } from "@/components/page/PageButton";
import { ProposeContext } from "@/modules/context/ProposeContext";
import { QueryStore } from "@/modules/query/QueryStore";
import { StakeField } from "@/components/app/claim/propose/field/StakeField";
import { SubmitButton } from "@/components/app/claim/propose/editor/SubmitButton";
import { TokenStore } from "@/modules/token/TokenStore";
import { useRouter } from "next/navigation";

export default function Page() {
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
        <div className="flex-none">
          <SubmitButton
            error={(ctx: ProposeContext) => {
              TokenStore.getState().updateBalance();
            }}
            offchain={(ctx: ProposeContext) => {
              router.push(`/claim/${ctx.post.id}`);
              TokenStore.getState().updateBalance();
            }}
            onchain={(ctx: ProposeContext) => {
              QueryStore.getState().claim.refresh();
              TokenStore.getState().updateBalance();
            }}
            rejected={(ctx: ProposeContext) => {
              router.push(`/claim/propose`);
              TokenStore.getState().updateBalance();
            }}
          />
        </div>
      </div>

      <div className="flex my-4 p-4 bg-gray-50 dark:bg-gray-900 rounded">
        <div className="w-full text-sm text-gray-500 dark:text-gray-400 overflow-auto">
          You are about to lock up your funds until this new market resolves.
          There is no guarantee of repayment. Learn more at&nbsp;
          <Link
            className="text-blue-400"
            href="https://docs.uvio.network"
            target="_blank"
          >
            docs.uvio.network
          </Link>
          .
        </div>
      </div>
    </div>
  );
};
