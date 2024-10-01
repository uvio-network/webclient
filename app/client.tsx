"use client";

import { ClaimList } from "@/components/claim/ClaimList";
import { PageHeader } from "@/components/page/PageHeader";

export const Client = () => {
  return (
    <>
      <PageHeader
        titl="Latest Claims"
      />
      <ClaimList
        query={["claim", "time", "latest"]}
        request={[{ time: "latest" }]}
      />
    </>
  );
};
