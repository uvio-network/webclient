"use client";

import * as React from "react";

import { LoadingStore } from "@/components/loading/LoadingStore";
import { UserStore } from "@/modules/user/UserStore";
import { useShallow } from "zustand/react/shallow";

export const AuthPage = ({ children }: { children: React.ReactNode }) => {
  const { loaded } = LoadingStore();

  const { valid } = UserStore(useShallow((state) => ({
    valid: state.valid,
  })));

  if (!loaded) {
    return <></>;
  }

  return (
    <>
      {valid ? (
        <div>
          {children}
        </div>
      ) : (
        <>
          {loaded && (
            <div>
              You need to login to see this page.
            </div>
          )}
        </>
      )}
    </>
  );
};
