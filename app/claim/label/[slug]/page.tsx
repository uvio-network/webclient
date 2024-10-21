"use client";

import { ClaimList } from "@/components/claim/ClaimList";
import { PageHeader } from "@/components/layout/PageHeader";

export default function Page({ params }: { params: { slug: string } }) {
  return (
    <>
      <PageHeader titl={`Claims with label "${params.slug}"`} />
      <ClaimList
        comments={false}
        query={["claim", "labels", params.slug]}
        request={{ labels: params.slug }}
      />
    </>
  );
};
