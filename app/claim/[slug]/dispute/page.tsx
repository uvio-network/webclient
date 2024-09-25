"use client";

import Link from "next/link";

import * as React from "react";

import { ChainStore } from "@/modules/chain/ChainStore";
import { ClaimObject } from "@/modules/claim/ClaimObject";
import { ClaimPreview } from "@/components/app/claim/dispute/preview/ClaimPreview";
import { DisputeContext } from "@/modules/context/DisputeContext";
import { EditorStore } from "@/components/app/claim/dispute/editor/EditorStore";
import { EmptyUserSearchResponse } from "@/modules/api/user/search/Response";
import { ExpiryField } from "@/components/app/claim/dispute/field/ExpiryField";
import { MarkdownField } from "@/components/app/claim/dispute/field/MarkdownField";
import { MarkdownPreview } from "@/components/app/claim/dispute/preview/MarkdownPreview";
import { PageButton } from "@/components/page/PageButton";
import { PostSearch } from "@/modules/api/post/search/Search";
import { PostSearchResponse } from "@/modules/api/post/search/Response";
import { QueryStore } from "@/modules/query/QueryStore";
import { StakeField } from "@/components/app/claim/dispute/field/StakeField";
import { SubmitButton } from "@/components/app/claim/dispute/editor/SubmitButton";
import { TokenStore } from "@/modules/token/TokenStore";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function Page({ params }: { params: { slug: string } }) {
  const [amount, setAmount] = React.useState<number>(0);
  const [edit, setEdit] = React.useState<boolean>(true);
  const [precision, setPrecision] = React.useState<number>(0);
  const [token, setToken] = React.useState<string>("");

  const chain = ChainStore.getState().getActive();
  const editor = EditorStore.getState();
  const query = QueryStore.getState().query;

  const router = useRouter();

  const posts = useQuery({
    queryKey: ["claim", params.slug, "dispute", "PostSearch"],
    queryFn: async () => {
      const pos = await PostSearch("", [{ id: params.slug }]);

      // We want to show the claim that is being disputed on similar to the way
      // that users see claims on the timeline. The claims we are dealing with
      // here are embedded resolves. Therefore we want to show the resolve and
      // the embedded propose. In such a case, the propose being embedded
      // becomes the child of the resolve. This is the opposite of the
      // representation within a claim tree, where the resolve is the child of
      // the propose.
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
    if (posts.data) {
      const res = posts.data;
      const pro = posts.data.parent()!;

      const amo = pro.summary().minimum * 2;
      const tok = pro.token();
      const pre = chain.tokens[tok]?.precision || 2;

      editor.updateAmount(amo)
      editor.updateLabels(pro.labels().join(","))
      editor.updateOption(res.side())
      editor.updatePropose(pro.id())
      editor.updateResolve(res.id())
      editor.updateToken(tok)

      setAmount(amo);
      setPrecision(pre);
      setToken(tok);
    }
  }, [params.slug, posts.data, editor]);

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

          <div className="flex">
            <div className="basis-3/4">
              <ExpiryField />
            </div>
            <div className="basis-1/4">
              <StakeField
                amount={amount}
                precision={precision}
                token={token}
              />
            </div>
            <div className="flex-none">
              <SubmitButton
                error={(ctx: DisputeContext) => {
                  TokenStore.getState().updateBalance();
                }}
                offchain={(ctx: DisputeContext) => {
                  router.push(`/claim/${ctx.post.id}`);
                  TokenStore.getState().updateBalance();
                }}
                onchain={(ctx: DisputeContext) => {
                  QueryStore.getState().claim.refresh();
                  TokenStore.getState().updateBalance();
                }}
                rejected={(ctx: DisputeContext) => {
                  router.push(`/claim/${params.slug}/dispute`);
                  TokenStore.getState().updateBalance();
                }}
              />
            </div>
          </div>

          <div className="flex my-4 p-4 bg-gray-50 dark:bg-gray-900 rounded">
            <div className="w-full text-sm text-gray-500 dark:text-gray-400 overflow-auto">
              You are about to lock up {amount.toFixed(precision)} {token} until this new market resolves.
              There is no guarantee of getting your money back. Please read the docs at&nbsp;
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
        </>
      )}
    </>
  );
};
