"use client";

import * as React from "react";

import { EditorButton } from "@/components/app/claim/propose/editor/EditorButton";
import { ExpiryField } from "@/components/app/claim/propose/field/ExpiryField";
import { LabelsField } from "@/components/app/claim/propose/field/LabelsField";
import { LabelsPreview } from "@/components/app/claim/propose/preview/LabelsPreview";
import { MarkdownField } from "@/components/app/claim/propose/field/MarkdownField";
import { MarkdownPreview } from "@/components/app/claim/propose/preview/MarkdownPreview";
import { StakeField } from "@/components/app/claim/propose/field/StakeField";
import { SubmitButton } from "@/components/app/claim/propose/editor/SubmitButton";

export default function Page() {
  const [edit, setEdit] = React.useState<boolean>(true);

  return (
    <>
      <div className="flex mb-6 w-full items-center">
        <EditorButton
          active={edit}
          onClick={() => setEdit((old) => !old)}
          text="Write"
        />

        <EditorButton
          active={!edit}
          onClick={() => setEdit((old) => !old)}
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
        <ExpiryField />
        <StakeField />
        <SubmitButton />
      </div>
    </>
  );
};
