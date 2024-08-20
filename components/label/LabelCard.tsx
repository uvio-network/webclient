"use client";

import * as HoverCard from "@radix-ui/react-hover-card";

interface Props {
  children: React.ReactNode;
  text: string;
}

export const LabelCard = (props: Props) => {
  return (
    <HoverCard.Root
      closeDelay={500}
      openDelay={250}
    >
      <HoverCard.Trigger className="cursor-default">
        {props.children}
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
            {props.text}
          </div>
        </HoverCard.Content>
      </HoverCard.Portal>
    </HoverCard.Root>
  );
};
