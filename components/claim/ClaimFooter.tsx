import { BaseButton } from "@/components/button/BaseButton";
import { ClaimStake } from "@/modules/claim/object/ClaimStake";
import { TriangleDownIcon } from "@/components/icon/TriangleDownIcon";
import { TriangleUpIcon } from "@/components/icon/TriangleUpIcon";

interface Props {
  stake: ClaimStake;
  token: string;
}

export const ClaimFooter = (props: Props) => {
  return (
    <div className="flex mt-2 px-2 text-gray-500 dark:text-gray-400">
      <div className="flex-1 relative">
        <div className="absolute left-0 w-fit">
          <BaseButton
            font="font-normal"
            icon={<TriangleUpIcon className="mb-[1px]" />}
            position="right"
            text={`${props.stake.agree.toFixed(2)} ${props.token}`}
          />
        </div>
      </div>

      <div className="flex-1 w-full">
        <div className="mx-auto p-2 w-fit text-gray-400 dark:text-gray-500 underline underline-offset-4 decoration-dashed cursor-default">
          {`${props.stake.pnl.toFixed(2)} %`}
        </div>
      </div>

      <div className="flex-1 relative">
        <div className="absolute right-0 w-fit">
          <BaseButton
            font="font-normal"
            icon={<TriangleDownIcon className="mb-[1px]" />}
            position="left"
            text={`${props.stake.disagree.toFixed(2)} ${props.token}`}
          />
        </div>
      </div>
    </div>
  );
};
