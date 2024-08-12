"use client";

import * as React from "react";

import { ClaimObject } from "@/modules/claim/ClaimObject";
import { RenderMarkdown } from "@/components/markdown/RenderMarkdown";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { LimitMarkdown } from "@/modules/string/LimitMarkdown";

interface Props {
  claim: ClaimObject;
  editor?: boolean;
  embed?: boolean;
}

export const ClaimContent = (props: Props) => {
  const router = useRouter();

  const isPage = usePathname() === "/claim/" + props.claim.id() ? true : false;
  const claimPage = "/claim/" + props.claim.id();

  const process = (txt: string): string => {
    if (isPage) {
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

    // We do not want to interfere with any external link inside of the post's
    // markdown.
    if (t.tagName === "A") return;

    // We do not want to redirect the user again to the page they are already
    // looking at.
    if (isPage) return;

    if (e.metaKey || e.ctrlKey || props.editor === true) {
      window.open(claimPage, "_blank");
    } else {
      router.push(claimPage);
    }
  };

  return (
    <div className="" onClick={onClick}>
      <RenderMarkdown
        editor={props.editor}
        embed={props.embed}
        markdown={process(props.claim.markdown())}
      />
    </div>
  );
};
