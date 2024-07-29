import { BaseButton } from "@/components/button/BaseButton";
import { ClaimObject } from "@/modules/claim/object/ClaimObject";
import { TriangleDownIcon } from "@/components/icon/TriangleDownIcon";
import { TriangleUpIcon } from "@/components/icon/TriangleUpIcon";

interface Props {
  claim: ClaimObject;
}

export const ClaimFooter = (props: Props) => {
  return (
    <div className="flex mt-2 text-gray-500 dark:text-gray-400">
      <div className="flex-1 relative">
        <div className="absolute left-0 w-fit">
          <BaseButton
            font="font-normal"
            icon={<TriangleUpIcon className="mb-[2px]" />}
            position="right"
            text={`${props.claim.stake().agree.toFixed(2)} ${props.claim.token()}`}
          />
        </div>
      </div>

      <div className="flex-1 w-full">
        <div className="mx-auto p-2 w-fit text-gray-400 dark:text-gray-500 underline underline-offset-4 decoration-dashed cursor-default">
          {`${props.claim.stake().pnl.toFixed(2)} %`}
        </div>
      </div>

      <div className="flex-1 relative">
        <div className="absolute right-0 w-fit">
          <BaseButton
            font="font-normal"
            icon={<TriangleDownIcon className="mb-[2px]" />}
            position="left"
            text={`${props.claim.stake().disagree.toFixed(2)} ${props.claim.token()}`}
          />
        </div>
      </div>
    </div>
  );
};
