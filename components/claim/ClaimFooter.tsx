import { BaseButton } from "@/components/button/BaseButton";
import { ClaimFooterCard } from "@/components/claim/ClaimFooterCard";
import { ClaimOption } from "@/modules/claim/object/ClaimOption";
import { ClaimStake } from "@/modules/claim/object/ClaimStake";
import { TriangleDownIcon } from "@/components/icon/TriangleDownIcon";
import { TriangleUpIcon } from "@/components/icon/TriangleUpIcon";

interface Props {
  option: ClaimOption;
  stake: ClaimStake;
  token: string;
}

export const ClaimFooter = (props: Props) => {
  return (
    <div className="flex mt-2 px-2">
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
        <div className="mx-auto w-fit">
          <ClaimFooterCard
            option={props.option}
            stake={props.stake}
            token={props.token}
          />
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
