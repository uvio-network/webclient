import React from "react";

import * as Config from "@/modules/config";

import { Client } from "@/app/client";
import { Metadata } from "next";

interface Props {
  params: { slug: string };
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  return {
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
  };
};

export default function Page() {
  return (
    <Client />
  );
};
