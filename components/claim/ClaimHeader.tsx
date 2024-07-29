import { ClaimObject } from "@/modules/claim/object/ClaimObject";
import { StarLineIcon } from "../icon/StarLineIcon";
import { MenuHorizontalIcon } from "../icon/MenuHorizontalIcon";

interface Props {
  claim: ClaimObject;
}

export const ClaimHeader = (props: Props) => {
  return (
    <div className="flex">
      <div className="flex-none w-12 h-12 mr-2 rounded bg-gray-200 dark:bg-gray-700 border border-gray-300 dark:border-gray-600">
        {props.claim.owner().image()}
      </div>
      <div className="flex-1 w-full">
        <div className="font-medium">
          {props.claim.owner().name()}
        </div>
        <div className="flex h-6">
          <div className="my-auto text-gray-500 dark:text-gray-400 text-sm">
            {props.claim.created().format("Do MMM YYYY")}
            {` - `}
            {props.claim.expiry().format("Do MMM YYYY")}
          </div>
        </div>
      </div>
      <div className="flex-none">
        <div>
          <MenuHorizontalIcon size="w-6 h-6" />
        </div>
        <div>
          <StarLineIcon size="w-6 h-6" />
        </div>
      </div>
    </div>
  );
};
