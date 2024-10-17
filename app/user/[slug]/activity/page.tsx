"use client";

import { ClaimList } from "@/components/claim/ClaimList";
import { PageHeader } from "@/components/layout/PageHeader";

export default function Page({ params }: { params: { slug: string } }) {
  return (
    <>
      <PageHeader titl="User Activity" />
      <ClaimList
        query={["claim", "vote", params.slug]}
        request={[{ vote: params.slug }]}
      />
    </>
  );
};
