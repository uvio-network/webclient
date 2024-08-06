"use client";

import * as React from "react";

import { ClaimObject } from "@/modules/claim/object/ClaimObject";
import { RenderMarkdown } from "@/components/markdown/RenderMarkdown";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { LimitMarkdown } from "@/modules/string/LimitMarkdown";

interface Props {
  claim: ClaimObject;
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

    router.push(claimPage);
  };

  return (
    <div className="" onClick={onClick}>
      <RenderMarkdown
        markdown={process(props.claim.markdown())}
      />
    </div>
  );
};
