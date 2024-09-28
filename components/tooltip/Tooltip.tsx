import * as HoverCard from "@radix-ui/react-hover-card";
import * as React from "react";

interface Props {
  // content is the element that is shown to users when the trigger element
  // executes.
  content: React.ReactNode;
  // trigger is the element that user hover over or click in order to see the
  // tooltip content.
  trigger: React.ReactNode;
}

export const Tooltip = (props: Props) => {
  const [open, setOpen] = React.useState<boolean>(false);

  return (
    <HoverCard.Root
      closeDelay={500}
      openDelay={250}
      open={open}
      onOpenChange={setOpen}
    >
      <HoverCard.Trigger
        onTouchStart={() => setOpen(true)}
        onMouseDown={() => setOpen(true)}
      >
        {props.trigger}
      </HoverCard.Trigger>
      <HoverCard.Portal>
        <HoverCard.Content
          className={`
            p-2 max-w-[300px]
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
            {props.content}
          </div>
        </HoverCard.Content>
      </HoverCard.Portal>
    </HoverCard.Root>
  );
};
