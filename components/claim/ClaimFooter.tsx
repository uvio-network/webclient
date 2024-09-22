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

  const stakeAgree = votNum(isComment, props.claim, true);
  const stakeDisagree = votNum(isComment, props.claim, false);

  const textAgree = votStr(isResolve, stakeAgree, token);
  const textDisagree = votStr(isResolve, stakeDisagree, token);

  const onClick = () => {
    ToastSender.Info("It's comming just chill ok!");
  };

  return (
    <div className="flex px-2">
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

            {(isResolve || isComment) && stakeAgree !== 0 && (
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

            {(isResolve || isComment) && stakeDisagree !== 0 && (
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

const votNum = (com: boolean, cla: ClaimObject, opt: boolean): number => {
  if (!com) {
    if (opt) {
      return cla.votes().agreement;
    } else {
      return cla.votes().disagreement;
    }
  }

  if (opt) {
    return cla.parent()?.parent()?.votes().agreement || 0;
  } else {
    return cla.parent()?.parent()?.votes().disagreement || 0;
  }
};

const votStr = (res: boolean, num: number, tok: string): string => {
  if (res) return num.toFixed(0);

  return num.toFixed(2) + " " + tok;
};
