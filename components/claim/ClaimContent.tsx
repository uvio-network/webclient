"use client";

import * as React from "react";

import { ClaimObject } from "@/modules/claim/object/ClaimObject";
import { RenderMarkdown } from "@/components/markdown/RenderMarkdown";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { LimitMarkdown } from "@/modules/string/LimitMarkdown";

interface Props {
  claim: ClaimObject;
  embed?: boolean;
}

export const ClaimContent = (props: Props) => {
  const router = useRouter();
  const pathname = usePathname();

  const claimPage = "/claim/" + props.claim.id();

  const process = (txt: string): string => {
    if (pathname === claimPage) {
      return txt;
    }

    const lim = LimitMarkdown(txt);

    if (lim.cut === true) {
      return lim.txt + `[ ... show more](${claimPage})`;
    }

    return txt;
  };

  const onClick = (e: React.MouseEvent) => {
    const t = e.target as HTMLElement;

    if (t.tagName === "A") return;

    if (e.metaKey || e.ctrlKey || props.embed === true) {
      window.open(claimPage, "_blank");
    } else {
      router.push(claimPage);
    }
  };

  return (
    <div className="" onClick={onClick}>
      <RenderMarkdown
        embed={props.embed}
        markdown={process(props.claim.markdown())}
      />
    </div>
  );
};
