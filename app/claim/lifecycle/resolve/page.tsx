"use client";

import { ClaimList } from "@/components/claim/ClaimList";
import { PageHeader } from "@/components/layout/PageHeader";

export default function Page() {
  return (
    <>
      <PageHeader titl="Resolving Claims" />
      <ClaimList
        comments={false}
        query={["claim", "lifecycle", "resolve"]}
        request={{ lifecycle: "resolve" }}
      />
    </>
  );
};
