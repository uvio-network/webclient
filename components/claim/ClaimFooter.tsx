import { BaseButton } from "@/components/button/BaseButton";
import { ClaimFooterCard } from "@/components/claim/ClaimFooterCard";
import { ClaimObject } from "@/modules/claim/ClaimObject";
import { ClaimPage } from "@/modules/claim/ClaimPage";
import { EditorStore } from "@/modules/editor/EditorStore";
import { NoButton } from "@/components/button/NoButton";
import { QueryStore } from "@/modules/query/QueryStore";
import { Tooltip } from "@/components/tooltip/Tooltip";
import { TriangleDownIcon } from "@/components/icon/TriangleDownIcon";
import { TriangleUpIcon } from "@/components/icon/TriangleUpIcon";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

interface Props {
  claim: ClaimObject;
  comments: number;
}

export const ClaimFooter = (props: Props) => {
  const router = useRouter();

  const claimPage = "/claim/" + props.claim.id();

  const isClaim = props.claim.kind() === "claim";
  const isComment = props.claim.kind() === "comment";
  const isPage = ClaimPage(usePathname()) !== "";

  const filter = QueryStore.getState().claim.filter;
  const token = isClaim ? props.claim.token() : props.claim.parent()!.token();

  const postAgree = props.claim.summary().post.agreement;
  const postDisagree = props.claim.summary().post.disagreement;

  const textAgree = votStr(isComment, props.claim, postAgree, token);
  const textDisagree = votStr(isComment, props.claim, postDisagree, token);

  const onClick = (sid: boolean) => {
    return () => {
      if (isPage) {
        if (sid) {
          if (filter === "agree") {
            QueryStore.getState().updateClaimFilter("all");
          } else {
            QueryStore.getState().updateClaimFilter("agree");
          }
        } else {
          if (filter === "disagree") {
            QueryStore.getState().updateClaimFilter("all");
          } else {
            QueryStore.getState().updateClaimFilter("disagree");
          }
        }
      } else {
        // show the button overlay for staking on the next page
        {
          EditorStore.getState().updateOption(sid)
          EditorStore.getState().updateOverlay(true)
        }

        // redirect to claim page
        {
          router.push(claimPage);
        }
      }
    }
  };

  return (
    <div className="flex">
      <div className="flex-1 w-full">
        <div className="grid place-content-start w-full">
          <div className="grid place-content-start">
            {isClaim && !props.claim.isResolve() && (
              <BaseButton
                background={butBac(props.comments, isPage, filter, true)}
                disabled={isPage && props.comments === 0}
                effect={textAgree}
                font="font-normal"
                icon={<TriangleUpIcon className="mb-[1px]" />}
                onClick={onClick(true)}
                position="right"
                text={<>{textAgree}</>}
              />
            )}

            {(props.claim.isResolve() || isComment) && postAgree !== 0 && (
              <Tooltip
                content={
                  <>
                    {props.claim.isResolve() && (
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
            {isClaim && !props.claim.isResolve() && (
              <BaseButton
                background={butBac(props.comments, isPage, filter, false)}
                disabled={isPage && props.comments === 0}
                effect={textDisagree}
                font="font-normal"
                icon={<TriangleDownIcon className="mb-[1px]" />}
                onClick={onClick(false)}
                position="left"
                text={<>{textDisagree}</>}
              />
            )}

            {(props.claim.isResolve() || isComment) && postDisagree !== 0 && (
              <Tooltip
                content={
                  <>
                    {props.claim.isResolve() && (
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

// butBack returns the background configuration for the base button component in
// the claim footer.
//
//     The current UX is as such that hover only highlights the font, regardless
//     the page.
//
//     No background is applied on the feed page.
//
//     Background is applied on the claim page, if the given side is selected to
//     show only the given type of comments, namely "agree" or "disagree".
//
const butBac = (com: number, pag: boolean, fil: "agree" | "all" | "disagree", sid: boolean): string | undefined => {
  if (pag) {
    if (com === 0) {
      return "none";
    }

    if ((sid && fil === "agree") || (!sid && fil === "disagree")) {
      return "bg-gray-100 dark:bg-gray-900";
    }

    if (fil === "all") {
      return "none";
    }
  }

  return "none";
};

const votStr = (com: boolean, cla: ClaimObject, num: number, tok: string): string => {
  // if isComment on propose, then with token
  // if isComment on resolve, then without token
  if (com) {
    if (cla.parent()!.isResolve()) {
      return num.toFixed(0);
    } else {
      return num.toFixed(2) + " " + tok;
    }
  }

  // if isPropose, then with token
  // if isResolve, then without token
  if (cla.isResolve()) {
    return num.toFixed(0);
  } else {
    return num.toFixed(2) + " " + tok;
  }
};
