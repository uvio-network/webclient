import { ClaimContent } from "@/components/claim/ClaimContent";
import { ClaimObject } from "@/modules/claim/object/ClaimObject";

interface Props {
  claim: ClaimObject;
}

export const ClaimPreview = (props: Props) => {
  return (
    <div className="m-2 px-2 pb-2 background-overlay rounded border border-color">
      <ClaimContent
        claim={props.claim}
        editor={true}
        embed={true}
      />
    </div>
  );
};
