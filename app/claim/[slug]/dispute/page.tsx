"use client";

import * as React from "react";

import { EditorForm } from "@/components/editor/EditorForm";
import { EditorStake } from "@/components/editor/EditorStake";
import { EditorStore } from "@/modules/editor/EditorStore";
import { FundingInfoCard } from "@/components/card/FundingInfoCard";
import { NewSearchParentFunc } from "@/modules/editor/SearchParent";
import { QueryStore } from "@/modules/query/QueryStore";
import { useQuery } from "@tanstack/react-query";

interface Props {
  params: { slug: string };
}

export default function Page(props: Props) {
  const posts = useQuery(
    {
      queryKey: ["claim", props.params.slug, "dispute"],
      queryFn: NewSearchParentFunc({ id: props.params.slug }),
    },
    QueryStore.getState().query.client,
  )

  React.useEffect(() => {
    if (posts.isSuccess && posts.data) {
      EditorStore.getState().updatePropose(posts.data.parent()!);
      EditorStore.getState().updateResolve(posts.data);
    }
  }, [posts]);

  return (
    <EditorForm
      EditorStake={<EditorStake disabled={true} />}
      InfoCard={<FundingInfoCard />}
      Kind="claim"
      SendButtonTitle="Dispute Claim"
    />
  );
};
