"use client";

import * as React from "react";

import { LoadingStore } from "@/components/loading/LoadingStore";
import { UserStore } from "@/modules/user/UserStore";
import { useShallow } from "zustand/react/shallow";

export const AuthPage = ({ children }: { children: React.ReactNode }) => {
  const { authorizing, loaded, loading } = LoadingStore();
  const { valid } = UserStore(useShallow((state) => ({
    valid: state.user.valid,
  })));

  React.useEffect(() => {
    loaded();
  }, []);

  if (loading || authorizing) return <></>;

  return (
    <>
      {valid ? (
        <div>
          {children}
        </div>
      ) : (
        <>
          {!authorizing && (
            <div>
              You need to login to see this page.
            </div>
          )}
        </>
      )}
    </>
  );
};
