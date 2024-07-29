import { ClaimObject } from "@/modules/claim/object/ClaimObject";

interface Props {
  claim: ClaimObject;
}

export const ClaimFooter = (props: Props) => {
  return (
    <div className="flex mt-2">
      <div className="w-full text-left">
        up 7 ETH
      </div>

      <div className="w-full text-center text-green-700 font-bold">
        +35%
      </div>

      <div className="w-full text-right">
        2 ETH down
      </div>
    </div>
  );
};
