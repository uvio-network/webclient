import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as Separator from "@/components/layout/separator";
import * as ToastSender from "@/components/toast/ToastSender";

import { BaseButton } from "@/components/button/BaseButton";
import { ClaimObject } from "@/modules/claim/ClaimObject";
import { MenuHorizontalIcon } from "@/components/icon/MenuHorizontalIcon";
import { useRouter } from "next/navigation";

interface Props {
  claim: ClaimObject;
}

const itemClassName = `
  p-2
  rounded items-center outline-none cursor-pointer
  data-[highlighted]:bg-gray-200 dark:data-[highlighted]:bg-gray-700
`;

export const ClaimHeaderMenu = (props: Props) => {
  const router = useRouter();

  const isStaker = props.claim.upside().hsitg;
  const isVoter = props.claim.selected();

  const addComment = () => {
    if (isStaker || isVoter) {
      router.push(`/claim/${props.claim.id()}/comment`);
    } else {
      ToastSender.Info("You have no skin in the game to comment on that claim.");
    }
  };

  const onSelect = () => {
    ToastSender.Info("It's comming just chill ok!");
  };

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <BaseButton
          background="none"
          padding="p-0"
          icon={<MenuHorizontalIcon size="w-6 h-6" />}
        />
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className={`
            p-2 min-w-[220px]
            background border-color border rounded
            will-change-[opacity,transform]
            data-[side=top]:animate-slideDownAndFade
            data-[side=right]:animate-slideLeftAndFade
            data-[side=bottom]:animate-slideUpAndFade
            data-[side=left]:animate-slideRightAndFade
          `}
          sideOffset={5}
        >

          {props.claim.kind() === "claim" && (
            <>
              <DropdownMenu.Item className={itemClassName} onSelect={addComment}>
                Add Comment
              </DropdownMenu.Item>

              <Separator.Horizontal margin="my-2" />
            </>
          )}

          <DropdownMenu.Item className={itemClassName} onSelect={onSelect}>
            Adjourn
          </DropdownMenu.Item>
          <DropdownMenu.Item className={itemClassName} onSelect={onSelect}>
            Dispute
          </DropdownMenu.Item>
          <DropdownMenu.Item className={itemClassName} onSelect={onSelect}>
            Nullify
          </DropdownMenu.Item>
          <DropdownMenu.Item className={itemClassName} onSelect={onSelect}>
            Resolve
          </DropdownMenu.Item>

        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};
