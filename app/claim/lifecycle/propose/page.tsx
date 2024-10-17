"use client";

import { ClaimList } from "@/components/claim/ClaimList";
import { ClaimObject } from "@/modules/claim/ClaimObject";
import { PageHeader } from "@/components/layout/PageHeader";

export default function Page() {
  return (
    <>
      <PageHeader titl="Proposed Claims" />
      <ClaimList
        filter={(cla: ClaimObject): boolean => (cla.lifecycle() === "propose")}
        query={["claim", "lifecycle", "propose"]}
        request={[{ lifecycle: "propose" }]}
      />
    </>
  );
};
