"use client";

import * as React from "react";

import { ClaimObject } from "@/modules/claim/ClaimObject";
import { ClaimPreview } from "@/components/app/claim/comment/preview/ClaimPreview";
import { EditorStore } from "@/components/app/claim/comment/editor/EditorStore";
import { EmptyUserSearchResponse } from "@/modules/api/user/search/Response";
import { MarkdownField } from "@/components/app/claim/comment/field/MarkdownField";
import { MarkdownPreview } from "@/components/app/claim/comment/preview/MarkdownPreview";
import { PageButton } from "@/components/page/PageButton";
import { PostSearch } from "@/modules/api/post/search/Search";
import { PostSearchResponse } from "@/modules/api/post/search/Response";
import { QueryStore } from "@/modules/query/QueryStore";
import { SubmitButton } from "@/components/app/claim/comment/editor/SubmitButton";
import { useQuery } from "@tanstack/react-query";

export default function Page({ params }: { params: { slug: string } }) {
  const [edit, setEdit] = React.useState<boolean>(true);

  const editor = EditorStore.getState();
  const query = QueryStore.getState().query;

  const posts = useQuery({
    queryKey: ["claim", params.slug, "comment", "PostSearch"],
    queryFn: async () => {
      const pos = await PostSearch("", [{ id: params.slug }]);

      // We want to show the claim that is being commented on similar to the way
      // that users see claims on the timeline. Some claims are standalone like
      // proposes, some claims are embedded like resolves. If a user comments on
      // a resolve, then we want to show the resolve and the embedded propose.
      // In such a case, the propose being embedded becomes the child of the
      // resolve. This is the opposite of the representation within a claim
      // tree, where the resolve is the child of the propose.
      let child: PostSearchResponse | undefined = undefined;

      for (const x of pos) {
        if (x.kind === "claim" && x.id !== params.slug) {
          child = x;
          break;
        }
      }

      for (const x of pos) {
        if (x.kind === "claim" && x.id === params.slug) {
          return new ClaimObject(x, EmptyUserSearchResponse(), child, []);
        } else {
          return undefined;
        }
      }
    },
  }, query.client)

  React.useEffect(() => {
    editor.updateClaim(params.slug)
  }, [params.slug, editor]);

  return (
    <>
      {!posts.data && (
        <>
          claim not found
        </>
      )}

      {posts.data && (
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
            <MarkdownField />
          ) : (
            <MarkdownPreview />
          )}

          <ClaimPreview
            claim={posts.data}
          />

          <div className="grid place-content-end">
            <SubmitButton />
          </div>
        </>
      )}
    </>
  );
};
