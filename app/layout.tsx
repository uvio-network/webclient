"use client"

import { Inter } from "next/font/google";
import "@/app/globals.css";

import * as Toast from "@radix-ui/react-toast";

import { Sidebar } from "@/components/sidebar/Sidebar";
import { ToastRender } from "@/components/toast/ToastRender";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toast.Provider duration={10 * 1000} swipeDirection="right">

          {/*
          The sidebar component should remain above the rest of the
          child components because of the stacking order within the dom.
          Keeping the sidebar here ensures all of our tooltips are
          readable from anywhere any time.
          */}
          <Sidebar />

          <div className="mt-4 mx-2 justify-items-center">
            <div className="m-auto w-full max-w-xl">
              {/*
              The div below works together with the Sidebar component to ensure
              that no main element within the page is hidden during media query
              transitions. Therefore this div applies a margin on the left side
              in order to shift the page content slightly to the right between
              screen width of 1024px and 1120px.
              */}
              <div className="min-[1024px]:ml-12 min-[1120px]:ml-0">

                {children}

              </div>
            </div>
          </div >

          <ToastRender />

          <Toast.Viewport className="[--viewport-padding:_25px] fixed bottom-0 right-0 flex flex-col p-[var(--viewport-padding)] gap-[10px] w-[390px] max-w-[100vw] m-0 list-none z-[2147483647] outline-none" />
        </Toast.Provider >
      </body>
    </html>
  );
}
