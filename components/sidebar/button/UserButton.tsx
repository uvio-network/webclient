import Link from "next/link";

import { AccountIcon } from "@/components/icon/AccountIcon";
import { AuthStore } from "@/components/auth/AuthStore";
import { BaseButton } from "@/components/button/BaseButton";
import { useShallow } from "zustand/react/shallow";

export const UserButton = () => {
  const { id, name } = AuthStore(useShallow((state) => ({
    id: state.auth.id,
    name: state.auth.name,
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
