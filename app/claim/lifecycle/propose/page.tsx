"use client";

import { ClaimList } from "@/components/claim/ClaimList";
import { PageHeader } from "@/components/layout/PageHeader";

export default function Page() {
  return (
    <>
      <PageHeader titl="Proposed Claims" />
      <ClaimList
        comments={false}
        query={["claim", "lifecycle", "propose"]}
        request={{ lifecycle: "propose" }}
      />
    </>
  );
};
