"use client";

import { ArrowUpLeftIcon } from "@/components/icon/ArrowUpLeftIcon";
import { ClaimList } from "@/components/claim/ClaimList";
import { ClaimStore } from "@/modules/claim/ClaimStore";
import { PageHeader } from "@/components/page/PageHeader";
import { useShallow } from "zustand/react/shallow";

export default function Page({ params }: { params: { slug: string } }) {
  const { tree } = ClaimStore(useShallow((state) => ({
    tree: state.tree,
  })));

  return (
    <>
      <PageHeader
        icon={<ArrowUpLeftIcon />}
        link={tree ? `/claim/tree/${tree}` : ""}
        titl="Claim Tree"
      />
      <ClaimList
        query={["claim", "id", params.slug]}
        request={[{ id: params.slug }]}
      />
    </>
  );
};
