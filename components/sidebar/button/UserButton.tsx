import Link from "next/link";

import { AccountIcon } from "@/components/icon/AccountIcon";
import { BaseButton } from "@/components/button/BaseButton";
import { UserStore } from "@/modules/user/UserStore";
import { useShallow } from "zustand/react/shallow";

export const UserButton = () => {
  const { object } = UserStore(useShallow((state) => ({
    object: state.user.object,
  })));

  return (
    <>
      {object && (
        <Link href={"/user/" + object.id()}>
          <BaseButton
            icon={<AccountIcon />}
            text={object.name()}
          />
        </Link>
      )}
    </>
  );
};
