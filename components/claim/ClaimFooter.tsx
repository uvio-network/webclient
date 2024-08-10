import { BaseButton } from "@/components/button/BaseButton";
import { NoButton } from "@/components/button/NoButton";
import { ClaimFooterCard } from "@/components/claim/ClaimFooterCard";
import { ClaimObject } from "@/modules/claim/object/ClaimObject";
import { TriangleDownIcon } from "@/components/icon/TriangleDownIcon";
import { TriangleUpIcon } from "@/components/icon/TriangleUpIcon";

interface Props {
  claim: ClaimObject;
}

export const ClaimFooter = (props: Props) => {
  const token = props.claim.kind() === "claim" ? props.claim.token() : props.claim.parent()?.token();

  const isClaim = props.claim.kind() === "claim";
  const isComment = props.claim.kind() === "comment";

  const stakeAgree = isComment && props.claim.votes().agreement !== 0 ? true : false;
  const stakeDisagree = isComment && props.claim.votes().disagreement !== 0 ? true : false;

  const textAgree = props.claim.votes().agreement.toFixed(2) + " " + token;
  const textDisagree = props.claim.votes().disagreement.toFixed(2) + " " + token;

  return (
    <div className="flex mt-2 px-2">
      <div className="flex-1 w-full">
        <div className="grid place-content-start w-full">
          <div className="grid place-content-start">
            {isClaim && (
              <BaseButton
                effect={true}
                font="font-normal"
                icon={<TriangleUpIcon className="mb-[1px]" />}
                position="right"
                text={textAgree}
              />
            )}

            {stakeAgree && (
              <NoButton
                effect={true}
                font="font-normal"
                icon={<TriangleUpIcon className="mb-[1px]" />}
                position="right"
                text={textAgree}
              />
            )}
          </div>
        </div>
      </div>

      {isClaim && (
        <div className="flex-1 w-full">
          <div className="mx-auto w-fit">
            <ClaimFooterCard claim={props.claim} />
          </div>
        </div>
      )}

      <div className="flex-1 w-full">
        <div className="grid place-content-end w-full">
          <div className="grid place-content-end">
            {isClaim && (
              <BaseButton
                effect={true}
                font="font-normal"
                icon={<TriangleDownIcon className="mb-[1px]" />}
                position="left"
                text={textDisagree}
              />
            )}

            {stakeDisagree && (
              <NoButton
                effect={true}
                font="font-normal"
                icon={<TriangleDownIcon className="mb-[1px]" />}
                position="left"
                text={textDisagree}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
