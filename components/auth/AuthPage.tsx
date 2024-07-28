"use client";

import * as Privy from "@privy-io/react-auth";
import * as React from "react";

// TODO
export const AuthPage = (Component: React.ComponentType) => {
  return (props: any) => {
    const { authenticated, login, ready } = Privy.usePrivy();

    if (!ready) return <></>;
    if (!authenticated) return login();

    return <Component {...props} />;
  };
};
