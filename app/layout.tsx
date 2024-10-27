import "@/app/effects.css";
import "@/app/globals.css";

import * as Config from "@/modules/config";
import * as React from "react";

import { Inter } from "next/font/google";
import { LoadingPage } from "@/components/loading/LoadingPage";
import { Metadata } from "next";
import { Viewport } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Uvio | See What's Real",
  description: "Information Markets for Everyone",
  keywords: [
    "information market",
    "prediction market",
    "social network",
  ],
  openGraph: {
    type: "website",
    url: Config.WebclientAppEndpoint,
    siteName: "Uvio",
    title: "Uvio | See What's Real",
    description: "Information Markets for Everyone",
    images: [{
      url: Config.WebclientAppEndpoint + "/logos/Uvio-Base-Frame-Logo.png",
    }],
  },
  other: {
    "fc:frame": "vNext",
    "fc:frame:image": Config.WebclientAppEndpoint + "/logos/Uvio-Base-Frame-Logo.png",
    "fc:frame:image:aspect_ratio": "1.91:1",
    "fc:frame:button:1": "Now on Base Testnet",
    "fc:frame:button:1:action": "link",
    "fc:frame:button:1:target": Config.WebclientAppEndpoint,
  },
  twitter: {
    card: "summary",
    title: "Uvio | See What's Real",
    description: "Information Markets for Everyone",
    images: [{
      url: Config.WebclientAppEndpoint + "/logos/Uvio-Base-Frame-Logo.png",
    }],
  },
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
