"use client";

import { AuthStore } from "@/components/auth/AuthStore";
import { PageHeader } from "@/components/page/PageHeader";

export const Page = () => {
  const { auth } = AuthStore();

  return (
    <>
      <PageHeader titl="Latest Claims" />

      <div>
        {auth.valid ? (
          <p>Access Token: {auth.token}</p>
        ) : (
          <p>User is not authenticated</p>
        )}
      </div>
    </>
  );
};

export default Page;
