"use client";

import React from "react";

import * as ToastSender from "@/components/toast/ToastSender";

import { AuthStore } from "@/components/auth/AuthStore";
import { ClaimContainer } from "@/components/claim/ClaimContainer";
import { ClaimObject } from "@/modules/claim/object/ClaimObject";
import { Locker } from "@/modules/locker/Locker";
import { PageHeader } from "@/components/page/PageHeader";
import { PostSearch } from "@/modules/api/post/search/Search";
import { UserSearch } from "@/modules/api/user/search/Search";

const locker = new Locker();

export default function Page({ params }: { params: { slug: string } }) {
  const [claim, setClaim] = React.useState<ClaimObject | null>(null);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const [pos] = await PostSearch(AuthStore.getState().auth.token, [{ id: params.slug }]);
        const [use] = await UserSearch(AuthStore.getState().auth.token, [{ id: pos.owner }]);
        setClaim(new ClaimObject(pos, use));
      } catch (err) {
        ToastSender.Error("Can't fockin' doit mate, those bloody beavers I swear!");
      }
    };

    if (params.slug && !locker.locked()) {
      locker.lock();
      fetchData();
    }
  }, [params.slug, setClaim]);

  return (
    <>
      <PageHeader titl="Claim Object" />

      {claim && (
        <ClaimContainer claim={claim} />
      )}
    </>
  );
};
