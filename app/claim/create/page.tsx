"use client";

import * as React from "react";
import * as Form from "@radix-ui/react-form";

import { EditorButton } from "@/components/app/claim/create/editor/EditorButton";
import { ExpiryField } from "@/components/app/claim/create/field/ExpiryField";
import { LabelsField } from "@/components/app/claim/create/field/LabelsField";
import { LabelsPreview } from "@/components/app/claim/create/preview/LabelsPreview";
import { MarkdownField } from "@/components/app/claim/create/field/MarkdownField";
import { MarkdownPreview } from "@/components/app/claim/create/preview/MarkdownPreview";
import { StakeField } from "@/components/app/claim/create/field/StakeField";

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

      <Form.Root
        className=""
        onSubmit={(values) => {
          console.log(values);
        }}
      >
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

          <Form.Submit asChild>
            <button className="flex-none bg-blue-400">
              Propose Claim
            </button>
          </Form.Submit>
        </div>
      </Form.Root>
    </>
  );
};
