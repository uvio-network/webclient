import { ClaimContent } from "@/components/claim/ClaimContent";
import { ClaimObject } from "@/modules/claim/ClaimObject";

interface Props {
  claim: ClaimObject;
}

export const ClaimPreview = (props: Props) => {
  return (
    <div>
      <div className="m-2 px-2 pb-2 background-overlay rounded border border-color">
        <ClaimContent
          claim={props.claim}
          editor={true}
          embed={true}
        />
      </div>

      {props.claim.parent() && (
        <div className="m-2 px-2 pb-2 background-overlay rounded border border-color">
          <ClaimContent
            claim={props.claim.parent()!}
            editor={false}
            embed={true}
          />
        </div>
      )}
    </div>
  );
};
