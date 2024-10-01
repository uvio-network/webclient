"use client";

import * as React from "react";

import { AppLogo } from "@/components/app/AppLogo";
import { AppProvider } from "@/components/app/AppProvider";
import { LoadingStore } from "@/components/loading/LoadingStore";

export const LoadingPage = ({ children }: { children: React.ReactNode }) => {
  const { loading } = LoadingStore();

  return (
    <>
      <AppProvider />

      {loading ? (
        <div className="flex items-center justify-center min-h-screen">
          <AppLogo
            height="54px"
            width="336px"
          />
          {children}
        </div>
      ) : (
        <div className="py-4 px-2 background justify-items-center">
          <div className="m-auto h-full w-full max-w-xl">
            {/*
            The div below works together with the Sidebar component to ensure
            that no main element within the page is hidden during media query
            transitions. Therefore this div applies a margin on the left side in
            order to shift the page content slightly to the right between screen
            width of 1024px and 1120px.
            */}
            <div className="min-[1024px]:ml-12 min-[1120px]:ml-0">

              {children}

            </div>
          </div>
        </div >
      )}
    </>
  );
};
