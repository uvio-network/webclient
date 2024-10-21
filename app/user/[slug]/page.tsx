"use client";

import { ClaimList } from "@/components/claim/ClaimList";
import { PageHeader } from "@/components/layout/PageHeader";

export default function Page({ params }: { params: { slug: string } }) {
  return (
    <>
      <PageHeader titl="User Profile" />
      <ClaimList
        comments={false}
        query={["claim", "owner", params.slug]}
        request={{ owner: params.slug }}
      />
    </>
  );
};
