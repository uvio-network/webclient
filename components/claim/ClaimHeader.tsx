import Image from "next/image";
import Link from "next/link";

import * as ToastSender from "@/components/toast/ToastSender";

import { BaseButton } from "@/components/button/BaseButton";
import { ClaimHeaderMenu } from "@/components/claim/ClaimHeaderMenu";
import { ClaimObject } from "@/modules/claim/ClaimObject";
import { StarLineIcon } from "@/components/icon/StarLineIcon";

interface Props {
  claim: ClaimObject;
}

export const ClaimHeader = (props: Props) => {
  const image = props.claim.owner().image();

  const onClick = () => {
    ToastSender.Info("It's comming just chill ok!");
  };

  return (
    <div className="flex">
      <div className={`
        flex-none w-12 h-12 mr-2 rounded overflow-hidden
        ${image === "" && "background-overlay border border-color"}
      `}
      >
        {image !== "" && (
          <Link href={"/user/" + props.claim.owner().id()}>
            <Image
              alt={props.claim.owner().name()}
              src={image}
              width={48}
              height={48}
            />
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
            {props.claim.kind() === "claim" && props.claim.hasExpiry() && (
              <>
                {` - `}
                {props.claim.expiry().format("Do MMM YYYY")}
              </>
            )}
          </div>
        </div>
      </div>
      <div className="flex-none">
        <div className="h-6">
          <ClaimHeaderMenu claim={props.claim} />
        </div>
        <div className="h-6">
          <BaseButton
            background="none"
            onClick={onClick}
            padding="p-0"
            icon={<StarLineIcon size="w-6 h-6" />}
          />
        </div>
      </div>
    </div>
  );
};
