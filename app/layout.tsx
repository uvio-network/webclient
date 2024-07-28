"use client";

import "@/app/globals.css";

import { Inter } from "next/font/google";
import { AppProvider } from "@/components/app/AppProvider";

const inter = Inter({ subsets: ["latin"] });

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className={inter.className}>

        <AppProvider>

          <div className="mt-4 mx-2 justify-items-center">
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

        </AppProvider>

      </body>
    </html>
  );
};

export default Layout;
