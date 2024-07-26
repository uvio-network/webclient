"use client";

import { AuthStore } from "@/components/auth/AuthStore";
import { PageHeader } from "@/components/page/PageHeader";

export default function () {
  const { auth } = AuthStore();

  return (
    <>
      <PageHeader titl="Latest Claims" />


      <div>
        {auth.ready ? (
          <p>Access Token: {auth.token}</p>
        ) : (
          <p>User is not authenticated</p>
        )}
      </div>
    </>
  );
};
