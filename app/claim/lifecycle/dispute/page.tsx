"use client";

import { ClaimList } from "@/components/claim/ClaimList";
import { ClaimObject } from "@/modules/claim/ClaimObject";
import { PageHeader } from "@/components/page/PageHeader";

export default function Page() {
  return (
    <>
      <PageHeader titl="Disputed Claims" />
      <ClaimList
        filter={(cla: ClaimObject): boolean => (cla.lifecycle() === "dispute")}
        query={["claim", "lifecycle", "dispute"]}
        request={[{ lifecycle: "dispute" }]}
      />
    </>
  );
};
