"use client";

import * as React from "react";

import { ClaimPreview } from "@/components/app/claim/comment/preview/ClaimPreview";
import { EditorButton } from "@/components/app/claim/comment/editor/EditorButton";
import { EditorStore } from "@/components/app/claim/comment/editor/EditorStore";
import { MarkdownField } from "@/components/app/claim/comment/field/MarkdownField";
import { MarkdownPreview } from "@/components/app/claim/comment/preview/MarkdownPreview";
import { SubmitButton } from "@/components/app/claim/comment/editor/SubmitButton";

export default function Page({ params }: { params: { slug: string } }) {
  const [edit, setEdit] = React.useState<boolean>(true);

  const editor = EditorStore.getState();

  React.useEffect(() => {
    editor.updateClaim(params.slug)
  }, [params.slug, editor]);

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
        <MarkdownField />
      ) : (
        <MarkdownPreview />
      )}

      <ClaimPreview
        query={["claim", params.slug, "comment"]}
        request={[{ id: params.slug }]}
      />

      <div className="grid place-content-end">
        <SubmitButton />
      </div>
    </>
  );
};
