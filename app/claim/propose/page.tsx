"use client";

import * as React from "react";

import { ExpiryField } from "@/components/app/claim/propose/field/ExpiryField";
import { LabelsField } from "@/components/app/claim/propose/field/LabelsField";
import { LabelsPreview } from "@/components/app/claim/propose/preview/LabelsPreview";
import { MarkdownField } from "@/components/app/claim/propose/field/MarkdownField";
import { MarkdownPreview } from "@/components/app/claim/propose/preview/MarkdownPreview";
import { PageButton } from "@/components/page/PageButton";
import { StakeField } from "@/components/app/claim/propose/field/StakeField";
import { SubmitButton } from "@/components/app/claim/propose/editor/SubmitButton";
import { TokenStore } from "@/modules/token/TokenStore";
import { useRouter } from "next/navigation";

export default function Page() {
  const [edit, setEdit] = React.useState<boolean>(true);

  const router = useRouter();

  return (
    <>
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
            onSuccess={(pos: string, vot: string, tok: string, amo: number) => {
              router.push(`/claim/${pos}`);
              TokenStore.getState().updateAllocated(tok, amo);
              TokenStore.getState().updateAvailable();
            }}
          />
        </div>
      </div>
    </>
  );
};
