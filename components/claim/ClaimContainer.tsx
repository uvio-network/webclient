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

      {props.claim.kind() === "comment" && (
        <div className="mx-2 mt-2 px-2 pb-2 background-overlay rounded border border-color">
          <ClaimContent
            claim={props.claim.parent()!} // if kind is "comment" then parent() will never be undefined
            embed={true}
          />
        </div>
      )}

      <ClaimActions
        claim={props.claim.id()}
        kind={props.claim.kind()}
        labels={props.claim.labels()}
        lifecycle={props.claim.lifecycle()}
        token={props.claim.token()}
        upside={props.claim.upside()}
        votes={props.claim.votes()}
      />
    </div>
  );
};
