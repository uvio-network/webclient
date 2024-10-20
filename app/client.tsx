"use client";

import { ClaimList } from "@/components/claim/ClaimList";
import { PageHeader } from "@/components/layout/PageHeader";

export const Client = () => {
  return (
    <>
      <PageHeader
        titl="Latest Claims"
      />
      <ClaimList
        comments={false}
        query={["claim", "time", "latest"]}
        request={[{ time: "latest" }]}
      />
    </>
  );
};
