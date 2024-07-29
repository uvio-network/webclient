import Link from "next/link";

import * as ToastSender from "@/components/toast/ToastSender";

import { AuthStore } from "@/components/auth/AuthStore";
import { BaseButton } from "@/components/button/BaseButton";
import { UserFullIcon } from "@/components/icon/UserFullIcon";
import { truncateEthAddress } from "@/modules/wallet/WalletAddress";

export const UserButton = () => {
  const { auth } = AuthStore();

  const onClick = () => {
    ToastSender.Info("It's comming just chill ok!");
  };

  let text = "User Profile";
  if (auth.wallet !== "") {
    text = truncateEthAddress(auth.wallet);
  }

  return (
    <>
      {auth.valid && (
        <Link href="">
          <BaseButton
            icon={<UserFullIcon />}
            text={text}
            onClick={onClick}
          />
        </Link>
      )}
    </>
  );
};
