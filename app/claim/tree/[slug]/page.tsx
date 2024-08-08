"use client";

import { ClaimList } from "@/components/claim/ClaimList";
import { PageHeader } from "@/components/page/PageHeader";

export default function Page({ params }: { params: { slug: string } }) {
  return (
    <>
      <PageHeader titl="Claim object" />
      <ClaimList
        query={["claim", "tree", params.slug]}
        request={[{ tree: params.slug }]}
      />
    </>
  );
};
