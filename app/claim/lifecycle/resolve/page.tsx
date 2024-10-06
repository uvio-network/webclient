"use client";

import { ClaimList } from "@/components/claim/ClaimList";
import { ClaimObject } from "@/modules/claim/ClaimObject";
import { PageHeader } from "@/components/page/PageHeader";

export default function Page() {
  return (
    <>
      <PageHeader titl="Market Resolutions" />
      <ClaimList
        filter={(cla: ClaimObject): boolean => (cla.lifecycle() === "resolve")}
        query={["claim", "lifecycle", "resolve"]}
        request={[{ lifecycle: "resolve" }]}
      />
    </>
  );
};
