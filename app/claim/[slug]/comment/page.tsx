"use client";

import * as React from "react";

import { EditorForm } from "@/components/editor/EditorForm";
import { EditorStore } from "@/modules/editor/EditorStore";
import { InfoCard } from "@/components/card/InfoCard";
import { NewSearchParentFunc } from "@/modules/editor/SearchParent";
import { QueryStore } from "@/modules/query/QueryStore";
import { useQuery } from "@tanstack/react-query";

interface Props {
  params: { slug: string };
}

export default function Page(props: Props) {
  const posts = useQuery(
    {
      queryKey: ["claim", props.params.slug, "comment"],
      queryFn: NewSearchParentFunc({ id: props.params.slug }),
    },
    QueryStore.getState().claim.client,
  )

  React.useEffect(() => {
    if (posts.isSuccess && posts.data) {
      EditorStore.getState().updateParent(posts.data)
    }
  }, [posts]);

  return (
    <EditorForm
      EditorStake={undefined}
      InfoCard={
        <InfoCard
          close={false}
          color="yellow"
          text={<>You are commenting on the referenced Claim.</>}
        />
      }
      Kind="comment"
      SendButtonTitle="Post Comment"
    />
  );
};
