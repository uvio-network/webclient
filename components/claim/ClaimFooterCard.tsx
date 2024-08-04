import * as HoverCard from "@radix-ui/react-hover-card";

import { ClaimUpside } from "@/modules/claim/object/ClaimUpside";
import { ClaimVotes } from "@/modules/claim/object/ClaimVotes";

interface Props {
  token: string;
  upside: ClaimUpside;
  votes: ClaimVotes;
}

export const ClaimFooterCard = (props: Props) => {
  const probability = props.votes.probability.toFixed(0);

  const totalAgree = props.upside.total[0].toFixed(0);
  const totalDisagree = props.upside.total[1].toFixed(0);

  const upsideAgree = props.upside.upside[0].toFixed(0);
  const upsideDisagree = props.upside.upside[1].toFixed(0);

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

            {totalAgree !== "0" && (
              <div>
                You have {totalAgree} {props.token} staked in&nbsp;
                <strong>agreement</strong> with the claim&apos;s statement.

                <br /><br />

                Your potential upside is currently <strong>{upsideAgree}%</strong>,
                for which this market must be resolved in agreement with the
                claim&apos;s statement.
              </div>
            )}

            {totalDisagree !== "0" && (
              <div>
                You have {totalDisagree} {props.token} staked in&nbsp;
                <strong>disagreement</strong> with the claim&apos;s statement.

                <br /><br />

                Your potential upside is currently <strong>{upsideDisagree}%</strong>,
                for which this market must be resolved in disagreement with the
                claim&apos;s statement.
              </div>
            )}

            {totalAgree === "0" && totalDisagree === "0" && (
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
