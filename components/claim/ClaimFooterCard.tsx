import * as HoverCard from "@radix-ui/react-hover-card";
import * as Separator from "@/components/layout/separator";

import { ClaimUpside } from "@/modules/claim/object/ClaimUpside";
import { ClaimVotes } from "@/modules/claim/object/ClaimVotes";

interface Props {
  token: string;
  upside: ClaimUpside;
  votes: ClaimVotes;
}

export const ClaimFooterCard = (props: Props) => {
  const probability = props.votes.probability.toFixed(0);
  const total = (props.votes.agreement + props.votes.disagreement).toFixed(2);

  const stakeAgree = props.upside.stake[0];
  const stakeDisagree = props.upside.stake[1];

  const shareAgree = props.upside.share[0].toFixed(0);
  const shareDisagree = props.upside.share[1].toFixed(0);

  return (
    <HoverCard.Root
      closeDelay={500}
      openDelay={250}
    >
      <HoverCard.Trigger asChild>
        <div className="p-2 text-gray-400 dark:text-gray-500 underline underline-offset-4 decoration-dashed cursor-default">
          {`${probability} %`}
        </div>
      </HoverCard.Trigger>
      <HoverCard.Portal>
        <HoverCard.Content
          className={`
            p-2 w-[300px]
            background border-color border rounded
            data-[state=open]:transition-all
            data-[side=bottom]:animate-slideUpAndFade
            data-[side=right]:animate-slideLeftAndFade
            data-[side=left]:animate-slideRightAndFade
            data-[side=top]:animate-slideDownAndFade
          `}
          side="top"
          sideOffset={5}
        >
          <div className="text-gray-500 dark:text-gray-400 text-sm">
            This claim has a probability of <strong>{probability}%</strong> to
            be true, based on a total of {total} {props.token} staked.

            {stakeAgree !== 0 && (
              <div>
                <Separator.Horizontal />

                <div>
                  You have {stakeAgree} {props.token} staked in&nbsp;
                  <strong>agreement</strong> with the claim&apos;s statement.

                  <br /><br />

                  Your potential upside is currently <strong>{shareAgree}%</strong>,
                  for which this market must be resolved in agreement with the
                  claim&apos;s statement.
                </div>
              </div>
            )}

            {stakeDisagree !== 0 && (
              <div>
                <Separator.Horizontal />

                <div>

                  You have {stakeDisagree} {props.token} staked in&nbsp;
                  <strong>disagreement</strong> with the claim&apos;s statement.

                  <br /><br />

                  Your potential upside is currently <strong>{shareDisagree}%</strong>,
                  for which this market must be resolved in disagreement with the
                  claim&apos;s statement.
                </div>
              </div>
            )}

            {stakeAgree === 0 && stakeDisagree === 0 && (
              <div>
                <Separator.Horizontal />

                <div>
                  You have no reputation staked in this market.
                </div>
              </div>
            )}
          </div>
        </HoverCard.Content>
      </HoverCard.Portal>
    </HoverCard.Root>
  );
};
