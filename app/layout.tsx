import "@/app/effects.css";
import "@/app/globals.css";

import * as React from "react";

import { Inter } from "next/font/google";
import { LoadingPage } from "@/components/loading/LoadingPage";
import { Metadata } from "next";
import type { Viewport } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Uvio | See What's Real",
  description: "Uvio is the social network for prediction markets!",
  keywords: ["prediction market", "social network"],
  twitter: { card: "summary", site: "@uvio.network" }
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
  ],
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html className="min-h-screen dark" lang="en">
      {/*
      Note that the body element will receive either the "light" or "dark" class
      based on the chosen theme.
      */}
      <body className={`min-h-screen ${inter.className}`}>

        <LoadingPage>
          {children}
        </LoadingPage>

      </body>
    </html>
  );
};
