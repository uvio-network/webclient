"use client";

import * as HoverCard from "@radix-ui/react-hover-card";
import * as Separator from "@/components/layout/separator";

import { ClaimObject } from "@/modules/claim/ClaimObject";
import { EffectButton } from "@/components/button/EffectButton";

interface Props {
  claim: ClaimObject;
}

export const ClaimFooterCard = (props: Props) => {
  const hsitg = props.claim.upside().hsitg;
  const token = props.claim.token();

  const probability = props.claim.votes().probability.toFixed(0);
  const total = (props.claim.votes().agreement + props.claim.votes().disagreement).toFixed(2);

  const stakeAgree = props.claim.upside().stake[0];
  const stakeDisagree = props.claim.upside().stake[1];

  const shareAgree = props.claim.upside().share[0].toFixed(0);
  const shareDisagree = props.claim.upside().share[1].toFixed(0);

  return (
    <HoverCard.Root
      closeDelay={500}
      openDelay={250}
    >
      <HoverCard.Trigger className="text-gray-400 dark:text-gray-500">
        <EffectButton
          value={probability}
        >
          <div className="underline underline-offset-4 decoration-dashed cursor-default">
            {`${probability} %`}
          </div>
        </EffectButton>
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
            This claim has a probability of <strong>{probability}%</strong> to be true, based on a total of {total} {token} staked.

            {stakeAgree !== 0 && (
              <div>
                <Separator.Horizontal />

                <div>
                  You have {stakeAgree} {token} staked in <strong>agreement</strong> with the claim&apos;s statement.

                  <br /><br />

                  Your potential upside is currently <strong>{shareAgree}%</strong>, for which this market must be resolved in agreement with the claim&apos;s statement.
                </div>
              </div>
            )}

            {stakeDisagree !== 0 && (
              <div>
                <Separator.Horizontal />

                <div>
                  You have {stakeDisagree} {token} staked in <strong>disagreement</strong> with the claim&apos;s statement.

                  <br /><br />

                  Your potential upside is currently <strong>{shareDisagree}%</strong>, for which this market must be resolved in disagreement with the claim&apos;s statement.
                </div>
              </div>
            )}

            {hsitg === false && (
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
