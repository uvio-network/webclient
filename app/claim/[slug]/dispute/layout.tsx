import * as React from "react";

import { AuthPage } from "@/components/auth/AuthPage";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AuthPage>
        {children}
      </AuthPage>
    </>
  );
};
