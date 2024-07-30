import { ClaimActions } from "@/components/claim/ClaimActions";
import { ClaimContent } from "@/components/claim/ClaimContent";
import { ClaimHeader } from "@/components/claim/ClaimHeader";
import { ClaimObject } from "@/modules/claim/object/ClaimObject";

interface Props {
  claim: ClaimObject;
}

export const ClaimContainer = (props: Props) => {
  return (
    <div className="mb-8">
      <div className="p-2 w-full">
        <ClaimHeader claim={props.claim} />
        <ClaimContent claim={props.claim} />
      </div>

      <ClaimActions
        labels={props.claim.labels()}
        lifecycle={props.claim.lifecycle()}
        stake={props.claim.stake()}
        token={props.claim.token()}
      />
    </div>
  );
};
