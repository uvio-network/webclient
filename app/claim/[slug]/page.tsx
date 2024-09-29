import fs from "fs";
import Head from "next/head";
import satori from "satori";
import sharp from "sharp";

import { Client } from "@/app/claim/[slug]/client";
import { PostSearch } from "@/modules/api/post/search/Search";
import { NewClaimSummary } from "@/modules/claim/ClaimSummary";
import { Metadata } from "next";
import { LimitMarkdown } from "@/modules/string/LimitMarkdown";
import { RenderMarkdown } from "@/components/markdown/RenderMarkdown";
import { SplitList } from "@/modules/string/SplitList";

interface Props {
  params: { slug: string };
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const [pos] = await PostSearch("", [{ id: props.params.slug }]);
  const sum = NewClaimSummary(pos);

  const lab = SplitList(pos.labels);
  const tot = sum.agreement + sum.disagreement;
  const tit = `${tot.toFixed(2)} ${pos.token} staked on Uvio, do you agree?`;
  const per = (sum.agreement / tot) * 100;

  const svg = await satori(
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
    ,
    {
      width: 764,
      height: 400,
      fonts: [
        {
          name: "Inter-Regular",
          data: fs.readFileSync("fonts/Inter-Regular.ttf"),
          weight: 400,
          style: "normal",
        },
      ],
    },
  );

  const pngBuffer = await sharp(Buffer.from(svg)).png().toBuffer();
  const base64Image = pngBuffer.toString('base64');
  const dataUri = `data:image/png;base64,${base64Image}`;

  return {
    other: {
      "fc:frame": "vNext",
      "fc:frame:image": dataUri,
      "fc:frame:image:aspect_ratio": "1.91:1",
      "fc:frame:button:1": "Stake",
      "fc:frame:button:1:action": "link",
      "fc:frame:button:1:target": process.env.__NEXT_PRIVATE_ORIGIN + "/claim/" + props.params.slug,
      "og:title": tit,
      "og:image": dataUri,
    },
  };
};

export default function Page(props: Props) {
  return (
    <Client slug={props.params.slug} />
  );
};
