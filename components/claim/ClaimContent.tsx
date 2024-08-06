import * as React from "react";

import { ClaimObject } from "@/modules/claim/object/ClaimObject";
import { RenderMarkdown } from "@/components/markdown/RenderMarkdown";
import { useRouter } from "next/navigation";

interface Props {
  claim: ClaimObject;
}

export const ClaimContent = (props: Props) => {
  const router = useRouter();

  const onClick = (e: React.MouseEvent) => {
    const t = e.target as HTMLElement;

    if (t.tagName === "A") return;

    router.push("/claim/" + props.claim.id());
  };

  return (
    <div className="" onClick={onClick}>
      <RenderMarkdown
        text={props.claim.markdown()}
      />
    </div>
  );
};
