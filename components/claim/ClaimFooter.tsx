import { BaseButton } from "@/components/button/BaseButton";
import { ClaimFooterCard } from "@/components/claim/ClaimFooterCard";
import { ClaimUpside } from "@/modules/claim/object/ClaimUpside";
import { ClaimVotes } from "@/modules/claim/object/ClaimVotes";
import { TriangleDownIcon } from "@/components/icon/TriangleDownIcon";
import { TriangleUpIcon } from "@/components/icon/TriangleUpIcon";

interface Props {
  token: string;
  upside: ClaimUpside;
  votes: ClaimVotes;
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
            text={`${props.votes.agreement.toFixed(2)} ${props.token}`}
          />
        </div>
      </div>

      <div className="flex-1 w-full">
        <div className="mx-auto w-fit">
          <ClaimFooterCard
            token={props.token}
            upside={props.upside}
            votes={props.votes}
          />
        </div>
      </div>

      <div className="flex-1 relative">
        <div className="absolute right-0 w-fit">
          <BaseButton
            font="font-normal"
            icon={<TriangleDownIcon className="mb-[1px]" />}
            position="left"
            text={`${props.votes.disagreement.toFixed(2)} ${props.token}`}
          />
        </div>
      </div>
    </div>
  );
};
