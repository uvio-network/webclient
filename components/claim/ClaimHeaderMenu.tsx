import Link from "next/link";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as ToastSender from "@/components/toast/ToastSender";

import { BaseButton } from "@/components/button/BaseButton";
import { ClaimObject } from "@/modules/claim/ClaimObject";
import { HorizontalSeparator } from "@/components/layout/HorizontalSeparator";
import { InfoCircleIcon } from "@/components/icon/InfoCircleIcon";
import { MenuHorizontalIcon } from "@/components/icon/MenuHorizontalIcon";
import { Tooltip } from "@/components/tooltip/Tooltip";
import { useRouter } from "next/navigation";
import { UserStore } from "@/modules/user/UserStore";
import { useShallow } from "zustand/react/shallow";

interface Props {
  claim: ClaimObject;
}

const itemClassName = `
  flex p-2
  rounded items-center outline-none cursor-pointer
  data-[highlighted]:bg-gray-200 dark:data-[highlighted]:bg-gray-700
  data-[disabled]:text-gray-400 data-[disabled]:dark:text-gray-500
`;

export const ClaimHeaderMenu = (props: Props) => {
  const { valid } = UserStore(useShallow((state) => ({
    valid: state.valid,
  })));

  const router = useRouter();

  const isClaim = props.claim.kind() === "claim";
  const isChallenge = props.claim.expired() && props.claim.challenge();
  const isStaker = props.claim.summary().vote.hsitg;
  const isVoter = props.claim.selected();

  const disabled = !isStaker && !isVoter;

  const addComment = () => {
    if (disabled) {
      ToastSender.Info("You have no skin in the game to comment on this claim.");
    } else {
      router.push(`/claim/${props.claim.id()}/comment`);
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
              <DropdownMenu.Item
                disabled={disabled}
                className={itemClassName}
                onSelect={addComment}
              >
                <span className="w-fit whitespace-nowrap">
                  Add a Comment
                </span>
                {disabled && (
                  <span className="w-full grid place-content-end">
                    <Tooltip
                      content={
                        <>
                          {props.claim.isResolve() && (
                            <>
                              You cannot comment because you have not been selected to vote on this claim. You can still comment on the associated claim if you staked reputation there.
                            </>
                          )}
                          {(props.claim.isDispute() || props.claim.isPropose()) && (
                            <>
                              You cannot comment because you have no reputation staked on this claim.
                            </>
                          )}
                        </>
                      }
                      trigger={
                        <InfoCircleIcon />
                      }
                    />
                  </span>
                )}
              </DropdownMenu.Item>

              {props.claim.isResolve() && isChallenge && (
                <DropdownMenu.Item
                  className={itemClassName}
                  onSelect={addDispute}
                >
                  Dispute this Outcome
                </DropdownMenu.Item>
              )}

              <HorizontalSeparator margin="my-2" />
            </>
          )}

          <DropdownMenu.Item
            className={itemClassName}
          >
            <Link
              href="https://warpcast.com/xh3b4sd.eth"
              target="_blank"
            >
              Send us Feedback
            </Link>
          </DropdownMenu.Item>

        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root >
  );
};
