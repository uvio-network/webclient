import * as Separator from "@/components/layout/separator";

import { ClaimButtons } from "@/components/claim/ClaimButtons";
import { ClaimContent } from "@/components/claim/ClaimContent";
import { ClaimFooter } from "@/components/claim/ClaimFooter";
import { ClaimHeader } from "@/components/claim/ClaimHeader";
import { ClaimLabels } from "@/components/claim/ClaimLabels";
import { ClaimObject } from "@/modules/claim/object/ClaimObject";

interface Props {
  claim: ClaimObject;
}

export const ClaimContainer = (props: Props) => {
  return (
    <div className="mb-8 p-2 rounded sm:border border-gray-200 dark:border-gray-700">
      <ClaimHeader claim={props.claim} />
      <ClaimContent claim={props.claim} />
      <ClaimLabels claim={props.claim} />
      <Separator.Horizontal />
      <ClaimButtons claim={props.claim} />
      <ClaimFooter claim={props.claim} />
    </div >
  );
};
