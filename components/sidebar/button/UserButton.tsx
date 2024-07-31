import Link from "next/link";

import * as ToastSender from "@/components/toast/ToastSender";

import { AuthStore } from "@/components/auth/AuthStore";
import { BaseButton } from "@/components/button/BaseButton";
import { UserFullIcon } from "@/components/icon/UserFullIcon";
import { useShallow } from "zustand/react/shallow";

export const UserButton = () => {
  const { name } = AuthStore(useShallow((state) => ({ name: state.auth.name })));

  const onClick = () => {
    ToastSender.Info("It's comming just chill ok!");
  };

  let text = "User Profile";
  if (name !== "") {
    text = name;
  }

  return (
    <>
      {text && (
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
