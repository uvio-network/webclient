"use client";

import * as React from "react";

import { AuthPage } from "@/components/auth/AuthPage";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {typeof window.crypto === 'undefined' || typeof window.crypto.subtle === 'undefined' ? (
        <div>
          Your browser does not support cryptographic hashing algorithms. Try updating your system or use another browser.
        </div>
      ) : (
        <AuthPage>
          {children}
        </AuthPage>
      )}
    </>
  );
};
