"use client";

import "@/app/globals.css";

import { AppProvider } from "@/components/app/AppProvider";
import { Inter } from "next/font/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const inter = Inter({ subsets: ["latin"] });
const query = new QueryClient();

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html className="min-h-screen" lang="en">
      {/*
      Note that the body element will receive either the "light" or "dark" class
      based on the chosen theme.
      */}
      <body className={`min-h-screen ${inter.className}`}>

        <QueryClientProvider client={query}>
          <AppProvider />

          <div className="py-4 px-2 background justify-items-center">
            <div className="m-auto w-full max-w-xl">
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
        </QueryClientProvider>

      </body>
    </html>
  );
};
