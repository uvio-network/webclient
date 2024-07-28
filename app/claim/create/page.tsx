"use client";

import * as React from "react";

// import { AuthPage } from "@/components/auth/AuthPage"; // TODO
import { EditorButton } from "@/components/app/claim/create/editor/EditorButton";
import { ExpiryField } from "@/components/app/claim/create/field/ExpiryField";
import { LabelsField } from "@/components/app/claim/create/field/LabelsField";
import { LabelsPreview } from "@/components/app/claim/create/preview/LabelsPreview";
import { MarkdownField } from "@/components/app/claim/create/field/MarkdownField";
import { MarkdownPreview } from "@/components/app/claim/create/preview/MarkdownPreview";
import { StakeField } from "@/components/app/claim/create/field/StakeField";
import { SubmitButton } from "@/components/app/claim/create/editor/SubmitButton";

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
