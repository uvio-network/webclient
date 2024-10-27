"use client";

import { ClaimList } from "@/components/claim/ClaimList";
import { PageHeader } from "@/components/layout/PageHeader";

interface Props {
  params: { slug: string };
}

export default function Page(props: Props) {
  return (
    <>
      <PageHeader
        titl="Claim"
      />
      <ClaimList
        comments={true}
        query={["claim", "id", props.params.slug]}
        request={{ id: props.params.slug }}
      />
    </>
  );
};
