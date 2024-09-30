import fs from "fs";
import satori from "satori";
import sharp from "sharp";
import React from "react";

import * as Config from "@/modules/config";

import { Client } from "@/app/claim/[slug]/client";
import { Metadata } from "next";
import { NewClaimSummary } from "@/modules/claim/ClaimSummary";
import { PostSearch } from "@/modules/api/post/search/Search";
import { PostSearchResponse } from "@/modules/api/post/search/Response";
import { SatoriOptions } from "satori";

const font = fs.readFileSync("public/fonts/Inter-Regular.ttf");

interface Props {
  params: { slug: string };
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const pos = await getPos(props.params.slug);

  if (!pos) {
    return {};
  }

  const sum = NewClaimSummary(pos);
  const tot = sum.agreement + sum.disagreement;
  const tit = `${tot.toFixed(2)} ${pos.token} staked on Uvio, do you agree?`;
  const per = (sum.agreement / tot) * 100;

  const svg = await satori(
    imgDiv(tit, per),
    imgOpt(),
  );

  const png = await sharp(Buffer.from(svg)).png().toBuffer();
  const img = `data:image/png;base64,${png.toString("base64")}`;

  return {
    other: {
      "fc:frame": "vNext",
      "fc:frame:image": img,
      "fc:frame:image:aspect_ratio": "1.91:1",
      "fc:frame:button:1": "Stake",
      "fc:frame:button:1:action": "link",
      "fc:frame:button:1:target": Config.WebclientAppEndpoint + "/claim/" + props.params.slug,
      "og:title": tit,
      "og:image": img,
    },
  };
};

export default function Page(props: Props) {
  return (
    <Client slug={props.params.slug} />
  );
};

const getPos = async (oid: string): Promise<PostSearchResponse | undefined> => {
  try {
    const [pos] = await PostSearch("", [{ id: oid }]);
    return pos;
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

const imgDiv = (tit: string, per: number): React.ReactNode => {
  return (
    <div style={{
      color: "white",
      backgroundImage: "linear-gradient(135deg, #17101f, #3b2f59, #734b91)",
      display: "flex",
      height: "100%",
      textAlign: "center",
      verticalAlign: "middle",
      width: "100%",
    }}>
      <div style={{
        display: "flex",
        top: "30",
        left: "130",
        fontSize: "25",
        width: "100%",
        position: "absolute",
        textAlign: "center",
      }}>
        {tit}
      </div>
      <div style={{
        display: "flex",
        fontSize: "220",
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "auto",
        marginBottom: "auto",
      }}>
        {per.toFixed(0)}
      </div>
      <div style={{
        display: "flex",
        bottom: "40",
        left: "242",
        fontSize: "25",
        width: "100%",
        position: "absolute",
        textAlign: "center",
      }}>
        % chance of being true
      </div>
    </div>
  );
};

const imgOpt = (): SatoriOptions => {
  return {
    width: 764,
    height: 400,
    fonts: [
      {
        name: "Inter-Regular",
        data: font,
        weight: 400,
        style: "normal",
      },
    ],
  };
};
