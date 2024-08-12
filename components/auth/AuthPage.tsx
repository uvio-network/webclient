"use client";

import * as React from "react";

import { UserStore } from "@/modules/user/UserStore";
import { useShallow } from "zustand/react/shallow";

export const AuthPage = ({ children }: { children: React.ReactNode }) => {
  const { valid } = UserStore(useShallow((state) => ({
    valid: state.user.valid,
  })));

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
