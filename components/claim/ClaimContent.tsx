import { ClaimObject } from "@/modules/claim/object/ClaimObject";
import { RenderMarkdown } from "@/components/markdown/RenderMarkdown";

interface Props {
  claim: ClaimObject;
}

export const ClaimContent = (props: Props) => {
  return (
    <div className="">
      <RenderMarkdown
        text={props.claim.markdown()}
      />
    </div>
  );
};
