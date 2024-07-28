"use client";

import * as Privy from "@privy-io/react-auth";
import * as React from "react";

export const AuthPage = ({ children }: { children: React.ReactNode }) => {
  const { authenticated, ready } = Privy.usePrivy();

  if (!ready) return <></>;
  if (!authenticated) return <>You need to login to see this page.</>;

  return (
    <>
      {children}
    </>
  );
};
