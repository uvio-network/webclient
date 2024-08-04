"use client";

import { ClaimList } from "@/components/claim/ClaimList";
import { PageHeader } from "@/components/page/PageHeader";

export default function Page({ params }: { params: { slug: string } }) {
  return (
    <>
      <PageHeader titl="Claim object" />
      <ClaimList
        query={["claims", "id", params.slug]}
        request={[{ id: params.slug }]}
      />
    </>
  );
};
