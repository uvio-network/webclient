import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

import { ClaimObject } from "@/modules/claim/object/ClaimObject";
import { MenuHorizontalIcon } from "@/components/icon/MenuHorizontalIcon";

interface Props {
  claim: ClaimObject;
}

const itemClassName = `
  p-2
  rounded items-center outline-none cursor-pointer
  data-[highlighted]:bg-gray-200 dark:data-[highlighted]:bg-gray-700
`;

export const ClaimHeaderMenu = (props: Props) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          aria-label="Claim Actions"
        >
          <MenuHorizontalIcon size="w-6 h-6" />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className={`
            p-[5px] min-w-[220px]
            background border-color border rounded
            will-change-[opacity,transform]
            data-[side=top]:animate-slideDownAndFade
            data-[side=right]:animate-slideLeftAndFade
            data-[side=bottom]:animate-slideUpAndFade
            data-[side=left]:animate-slideRightAndFade
          `}
          sideOffset={5}
        >
          <DropdownMenu.Item className={itemClassName}>
            Adjourn
          </DropdownMenu.Item>
          <DropdownMenu.Item className={itemClassName}>
            Dispute
          </DropdownMenu.Item>
          <DropdownMenu.Item className={itemClassName}>
            Nullify
          </DropdownMenu.Item>
          <DropdownMenu.Item className={itemClassName}>
            Resolve
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};
