"use client";

import * as React from "react";

import { AuthStore } from "@/components/auth/AuthStore";
import { useShallow } from "zustand/react/shallow";

export const AuthPage = ({ children }: { children: React.ReactNode }) => {
  const { valid } = AuthStore(useShallow((state) => ({ valid: state.auth.valid })));

  if (!valid) return;

  return (
    <>
      {valid ? (
        <div>
          {children}
        </div>
      ) : (
        <div>
          You need to login to see this page.
        </div>
      )}
    </>
  );
};
