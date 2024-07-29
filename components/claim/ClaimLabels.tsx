import { ClaimObject } from "@/modules/claim/object/ClaimObject";
import { LabelList } from "@/components/claim/LabelList";

interface Props {
  claim: ClaimObject;
}

export const ClaimLabels = (props: Props) => {
  return (
    <div className="">
      <LabelList
        labels={props.claim.labels()}
        lifecycle={props.claim.lifecycle()}
      />
    </div>
  );
};
