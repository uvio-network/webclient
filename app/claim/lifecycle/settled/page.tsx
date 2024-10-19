"use client";

import { ClaimList } from "@/components/claim/ClaimList";
import { ClaimObject } from "@/modules/claim/ClaimObject";
import { PageHeader } from "@/components/layout/PageHeader";

export default function Page() {
  return (
    <>
      <PageHeader titl="Market Resolutions" />
      <ClaimList
        filter={(cla: ClaimObject): boolean => (cla.lifecycle() === "balance")}
        query={["claim", "lifecycle", "balance"]}
        request={[{ lifecycle: "balance" }]}
      />
    </>
  );
};
