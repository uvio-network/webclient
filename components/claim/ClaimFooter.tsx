import * as ToastSender from "@/components/toast/ToastSender";

import { BaseButton } from "@/components/button/BaseButton";
import { NoButton } from "@/components/button/NoButton";
import { ClaimFooterCard } from "@/components/claim/ClaimFooterCard";
import { ClaimObject } from "@/modules/claim/ClaimObject";
import { TriangleDownIcon } from "@/components/icon/TriangleDownIcon";
import { TriangleUpIcon } from "@/components/icon/TriangleUpIcon";

interface Props {
  claim: ClaimObject;
}

export const ClaimFooter = (props: Props) => {
  const isClaim = props.claim.kind() === "claim";
  const isComment = props.claim.kind() === "comment";
  const isResolve = props.claim.lifecycle() === "resolve";

  const token = isClaim ? props.claim.token() : props.claim.parent()!.token();

  const stakeAgree = props.claim.votes().agreement !== 0 ? true : false;
  const stakeDisagree = props.claim.votes().disagreement !== 0 ? true : false;

  const textAgree = votTxt(isResolve, props.claim.votes().agreement, token);
  const textDisagree = votTxt(isResolve, props.claim.votes().disagreement, token);

  const onClick = () => {
    ToastSender.Info("It's comming just chill ok!");
  };

  return (
    <div className="flex mt-2 px-2">
      <div className="flex-1 w-full">
        <div className="grid place-content-start w-full">
          <div className="grid place-content-start">
            {isClaim && !isResolve && (
              <BaseButton
                effect={true}
                font="font-normal"
                icon={<TriangleUpIcon className="mb-[1px]" />}
                onClick={onClick}
                position="right"
                text={textAgree}
              />
            )}

            {((isClaim && isResolve) || (isComment && stakeAgree)) && (
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
            {isClaim && !isResolve && (
              <BaseButton
                effect={true}
                font="font-normal"
                icon={<TriangleDownIcon className="mb-[1px]" />}
                onClick={onClick}
                position="left"
                text={textDisagree}
              />
            )}

            {((isClaim && isResolve) || (isComment && stakeDisagree)) && (
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

const votTxt = (res: boolean, num: number, tok: string): string => {
  if (res) return num.toFixed(0);

  return num.toFixed(2) + " " + tok;
};
