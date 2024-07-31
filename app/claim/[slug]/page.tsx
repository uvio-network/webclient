"use client";

import React from "react";

import { AuthStore } from "@/components/auth/AuthStore";
import { ClaimContainer } from "@/components/claim/ClaimContainer";
import { ClaimObject } from "@/modules/claim/object/ClaimObject";
import { PageHeader } from "@/components/page/PageHeader";
import { PostSearch } from "@/modules/api/post/search/Search";
import { UserSearch } from "@/modules/api/user/search/Search";

export default function Page({ params }: { params: { slug: string } }) {
  const [claim, setClaim] = React.useState<ClaimObject | null>(null);

  // TODO make sure the calls below are only made once per page load
  React.useEffect(() => {
    const fetchData = async () => {
      const [pos] = await PostSearch(AuthStore.getState().auth.token, [{ id: params.slug }]);
      const [use] = await UserSearch(AuthStore.getState().auth.token, [{ id: pos.owner }]);

      setClaim(new ClaimObject(pos, use));
    };

    {
      fetchData();
    }
  }, []);

  return (
    <>
      <PageHeader titl="Claim Object" />

      {claim && (
        <ClaimContainer claim={claim} />
      )}
    </>
  );
};
