"use client";

import { ClaimList } from "@/components/claim/ClaimList";
import { PageHeader } from "@/components/page/PageHeader";

export default function Page() {
  return (
    <>
      <PageHeader titl={`Claims for lifecycle "resolve"`} />
      <ClaimList
        query={["claim", "lifecycle", "resolve"]}
        request={[{ lifecycle: "resolve" }]}
      />
    </>
  );
};
