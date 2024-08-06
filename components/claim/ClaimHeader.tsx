import Link from "next/link";

import { ClaimHeaderMenu } from "@/components/claim/ClaimHeaderMenu";
import { ClaimObject } from "@/modules/claim/object/ClaimObject";
import { StarLineIcon } from "@/components/icon/StarLineIcon";

interface Props {
  claim: ClaimObject;
}

export const ClaimHeader = (props: Props) => {
  const image = props.claim.owner().image();

  return (
    <div className="flex">
      <div className={`
        flex-none w-12 h-12 mr-2 rounded overflow-hidden
        ${image === "" && "background-overlay border border-color"}
      `}
      >
        {image !== "" && (
          <Link href={"/user/" + props.claim.owner().id()}>
            <img src={image} />
          </Link>
        )}
      </div>
      <div className="flex-1 w-full">
        <div className="font-medium">
          <Link href={"/user/" + props.claim.owner().id()}>
            {props.claim.owner().name()}
          </Link>
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
          <ClaimHeaderMenu claim={props.claim} />
        </div>
        <div>
          <button type="button">
            <StarLineIcon size="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};
