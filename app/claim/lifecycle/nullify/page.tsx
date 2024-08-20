"use client";

import { ClaimList } from "@/components/claim/ClaimList";
import { PageHeader } from "@/components/page/PageHeader";

export default function Page() {
  return (
    <>
      <PageHeader titl={`Claims for lifecycle "nullify"`} />
      <ClaimList
        query={["claim", "lifecycle", "nullify"]}
        request={[{ lifecycle: "nullify" }]}
      />
    </>
  );
};
