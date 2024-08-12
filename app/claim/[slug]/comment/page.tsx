"use client";

import * as React from "react";

import { ClaimObject } from "@/modules/claim/ClaimObject";
import { ClaimPreview } from "@/components/app/claim/comment/preview/ClaimPreview";
import { EditorButton } from "@/components/app/claim/comment/editor/EditorButton";
import { EditorStore } from "@/components/app/claim/comment/editor/EditorStore";
import { EmptyUserSearchResponse } from "@/modules/api/user/search/Response";
import { MarkdownField } from "@/components/app/claim/comment/field/MarkdownField";
import { MarkdownPreview } from "@/components/app/claim/comment/preview/MarkdownPreview";
import { PostSearch } from "@/modules/api/post/search/Search";
import { SubmitButton } from "@/components/app/claim/comment/editor/SubmitButton";
import { useQuery } from "@tanstack/react-query";

export default function Page({ params }: { params: { slug: string } }) {
  const [edit, setEdit] = React.useState<boolean>(true);

  const editor = EditorStore.getState();

  const claim = useQuery({
    queryKey: ["claim", params.slug, "comment", "PostSearch"],
    queryFn: async () => {
      const pos = await PostSearch("", [{ id: params.slug }]);

      for (const x of pos) {
        if (x.id === params.slug) {
          if (x.kind === "claim") {
            return new ClaimObject(x, EmptyUserSearchResponse(), undefined, []);
          } else {
            return undefined;
          }
        }
      }
    },
  })

  React.useEffect(() => {
    editor.updateClaim(params.slug)
  }, [params.slug, editor]);

  return (
    <>
      {!claim.data && (
        <>
          claim not found
        </>
      )}

      {claim.data && (
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
            claim={claim.data}
          />

          <div className="grid place-content-end">
            <SubmitButton />
          </div>
        </>
      )}
    </>
  );
};
