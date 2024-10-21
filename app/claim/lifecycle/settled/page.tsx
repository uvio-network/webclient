"use client";

import { ClaimList } from "@/components/claim/ClaimList";
import { PageHeader } from "@/components/layout/PageHeader";

export default function Page() {
  return (
    <>
      <PageHeader titl="Settled Claims" />
      <ClaimList
        comments={false}
        query={["claim", "lifecycle", "balance"]}
        request={{ lifecycle: "balance" }}
      />
    </>
  );
};
