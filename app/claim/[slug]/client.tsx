"use client";

import { ClaimList } from "@/components/claim/ClaimList";
import { PageHeader } from "@/components/layout/PageHeader";

interface Props {
  slug: string;
}

export const Client = (props: Props) => {
  return (
    <>
      <PageHeader
        titl="Claim"
      />
      <ClaimList
        comments={true}
        query={["claim", "id", props.slug]}
        request={[{ id: props.slug }]}
      />
    </>
  );
};
