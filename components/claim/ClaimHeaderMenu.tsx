import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as Separator from "@/components/layout/separator";
import * as ToastSender from "@/components/toast/ToastSender";

import { BaseButton } from "@/components/button/BaseButton";
import { ClaimObject } from "@/modules/claim/ClaimObject";
import { MenuHorizontalIcon } from "@/components/icon/MenuHorizontalIcon";
import { useRouter } from "next/navigation";
import { UserStore } from "@/modules/user/UserStore";
import { useShallow } from "zustand/react/shallow";

interface Props {
  claim: ClaimObject;
}

const itemClassName = `
  p-2
  rounded items-center outline-none cursor-pointer
  data-[highlighted]:bg-gray-200 dark:data-[highlighted]:bg-gray-700
`;

export const ClaimHeaderMenu = (props: Props) => {
  const { valid } = UserStore(useShallow((state) => ({
    valid: state.user.valid,
  })));

  const router = useRouter();

  const isClaim = props.claim.kind() === "claim";
  const isResolve = props.claim.lifecycle() === "resolve";
  const isChallenge = props.claim.expired() && props.claim.challenge();
  const isStaker = props.claim.upside().hsitg;
  const isVoter = props.claim.selected();

  const addComment = () => {
    if (isStaker || isVoter) {
      router.push(`/claim/${props.claim.id()}/comment`);
    } else {
      ToastSender.Info("You have no skin in the game to comment on that claim.");
    }
  };

  const addDispute = () => {
    if (!valid) {
      ToastSender.Info("You need to login to dispute this resolution.");
      return;
    }

    {
      router.push(`/claim/${props.claim.id()}/dispute`);
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

          {isClaim && (
            <>
              <DropdownMenu.Item className={itemClassName} onSelect={addComment}>
                Add a Comment
              </DropdownMenu.Item>

              {isResolve && isChallenge && (
                <DropdownMenu.Item className={itemClassName} onSelect={addDispute}>
                  Dispute this Outcome
                </DropdownMenu.Item>
              )}

              <Separator.Horizontal margin="my-2" />
            </>
          )}

          <DropdownMenu.Item className={itemClassName} onSelect={onSelect}>
            Send us Feedback
          </DropdownMenu.Item>

        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root >
  );
};
