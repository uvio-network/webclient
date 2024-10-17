"use client";

import { ArrowUpLeftIcon } from "@/components/icon/ArrowUpLeftIcon";
import { ClaimList } from "@/components/claim/ClaimList";
import { ClaimStore } from "@/modules/claim/ClaimStore";
import { PageHeader } from "@/components/layout/PageHeader";
import { useShallow } from "zustand/react/shallow";

interface Props {
  slug: string;
}

export const Client = (props: Props) => {
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
        query={["claim", "id", props.slug]}
        request={[{ id: props.slug }]}
      />
    </>
  );
};
