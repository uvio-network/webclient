"use client";

import { ClaimList } from "@/components/claim/ClaimList";
import { PageHeader } from "@/components/page/PageHeader";

export default function Page({ params }: { params: { slug: string } }) {
  return (
    <>
      <PageHeader titl={`Claims for label "${params.slug}"`} />
      <ClaimList request={[{ labels: params.slug }]} />
    </>
  );
};
