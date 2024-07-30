import * as HoverCard from "@radix-ui/react-hover-card";

import { ClaimOption } from "@/modules/claim/object/ClaimOption";
import { ClaimStake } from "@/modules/claim/object/ClaimStake";

interface Props {
  option: ClaimOption;
  stake: ClaimStake;
  token: string;
}

export const ClaimFooterCard = (props: Props) => {
  const agreement = props.option.agree ? "agreement" : "disagreement";
  const probability = props.stake.probability.toFixed(0);
  const upside = props.stake.upside.toFixed(0);

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
            be true.

            <br /><br />

            {props.option.stake && (
              <div>
                You have {props.stake.user} {props.token} staked in&nbsp;
                <strong>{agreement}</strong> with the proposed claim.

                <br /><br />

                Your potential upside is currently <strong>{upside}%</strong>,
                for which this market must be resolved in your favour.
              </div>
            )}

            {!props.option.stake && (
              <div>
                You have no reputation staked in this market.
              </div>
            )}
          </div>
        </HoverCard.Content>
      </HoverCard.Portal>
    </HoverCard.Root>
  );
};
