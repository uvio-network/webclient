import * as ToastSender from "@/components/toast/ToastSender";

import { BaseButton } from "@/components/button/BaseButton";
import { NoButton } from "@/components/button/NoButton";
import { ClaimFooterCard } from "@/components/claim/ClaimFooterCard";
import { ClaimObject } from "@/modules/claim/ClaimObject";
import { Tooltip } from "@/components/tooltip/Tooltip";
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

  const stakeAgree = props.claim.summary().agreement;
  const stakeDisagree = props.claim.summary().disagreement;

  const textAgree = votStr(isComment, isResolve, props.claim, stakeAgree, token);
  const textDisagree = votStr(isComment, isResolve, props.claim, stakeDisagree, token);

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
              <Tooltip
                content={
                  <>
                    {isResolve && (
                      <>
                        The amount of votes cast on this resolution.
                      </>
                    )}
                    {isComment && (
                      <>
                        The user&apos;s skin in the game.
                      </>
                    )}
                  </>
                }
                trigger={
                  <NoButton
                    effect={true}
                    font="font-normal"
                    icon={<TriangleUpIcon className="mb-[1px]" />}
                    position="right"
                    text={textAgree}
                  />
                }
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
              <Tooltip
                content={
                  <>
                    {isResolve && (
                      <>
                        The amount of votes cast on this resolution.
                      </>
                    )}
                    {isComment && (
                      <>
                        The user&apos;s skin in the game.
                      </>
                    )}
                  </>
                }
                trigger={
                  <NoButton
                    effect={true}
                    font="font-normal"
                    icon={<TriangleDownIcon className="mb-[1px]" />}
                    position="left"
                    text={textDisagree}
                  />
                }
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const votStr = (com: boolean, res: boolean, cla: ClaimObject, num: number, tok: string): string => {
  // if isComment on propose, then with token
  // if isComment on resolve, then without token
  if (com) {
    if (cla.parent()!.lifecycle() === "resolve") {
      return num.toFixed(0);
    } else {
      return num.toFixed(2) + " " + tok;
    }
  }

  // if isPropose, then with token
  // if isResolve, then without token
  if (res) {
    return num.toFixed(0);
  } else {
    return num.toFixed(2) + " " + tok;
  }
};
