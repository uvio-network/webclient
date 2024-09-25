"use client";

import { ClaimList } from "@/components/claim/ClaimList";
import { PageHeader } from "@/components/page/PageHeader";

export default function Page() {
  return (
    <>
      <PageHeader titl="Proposed Claims" />
      <ClaimList
        query={["claim", "lifecycle", "propose"]}
        request={[{ lifecycle: "propose" }]}
      />
    </>
  );
};
