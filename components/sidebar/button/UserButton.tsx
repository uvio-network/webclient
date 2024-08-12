import Link from "next/link";

import { AccountIcon } from "@/components/icon/AccountIcon";
import { BaseButton } from "@/components/button/BaseButton";
import { UserStore } from "@/modules/user/UserStore";
import { useShallow } from "zustand/react/shallow";

export const UserButton = () => {
  const { id, name } = UserStore(useShallow((state) => ({
    id: state.user.id,
    name: state.user.name,
  })));

  return (
    <>
      {name && (
        <Link href={"/user/" + id}>
          <BaseButton
            icon={<AccountIcon />}
            text={name}
          />
        </Link>
      )}
    </>
  );
};
