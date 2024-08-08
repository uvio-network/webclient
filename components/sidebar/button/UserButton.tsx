import Link from "next/link";

import { AuthStore } from "@/components/auth/AuthStore";
import { BaseButton } from "@/components/button/BaseButton";
import { UserFullIcon } from "@/components/icon/UserFullIcon";
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
            icon={<UserFullIcon />}
            text={name}
          />
        </Link>
      )}
    </>
  );
};
