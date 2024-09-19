"use client";

import * as HoverCard from "@radix-ui/react-hover-card";

import { ClaimObject } from "@/modules/claim/ClaimObject";
import { ClaimFooterCardPropose } from "@/components/claim/ClaimFooterCardPropose";
import { ClaimFooterCardResolve } from "@/components/claim/ClaimFooterCardResolve";
import { EffectButton } from "@/components/button/EffectButton";

interface Props {
  claim: ClaimObject;
}

export const ClaimFooterCard = (props: Props) => {
  const probability = props.claim.votes().probability.toFixed(0);

  return (
    <HoverCard.Root
      closeDelay={500}
      openDelay={250}
    >
      <HoverCard.Trigger className="text-gray-400 dark:text-gray-500">
        <EffectButton value={probability}>
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
            {props.claim.lifecycle() === "resolve" ? (
              <ClaimFooterCardResolve claim={props.claim} />
            ) : (
              <ClaimFooterCardPropose claim={props.claim} />
            )}
          </div>
        </HoverCard.Content>
      </HoverCard.Portal>
    </HoverCard.Root>
  );
};
