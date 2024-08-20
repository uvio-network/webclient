"use client";

import { ClaimList } from "@/components/claim/ClaimList";
import { PageHeader } from "@/components/page/PageHeader";

export default function Page() {
  return (
    <>
      <PageHeader titl={`Claims for lifecycle "adjourn"`} />
      <ClaimList
        query={["claim", "lifecycle", "adjourn"]}
        request={[{ lifecycle: "adjourn" }]}
      />
    </>
  );
};
