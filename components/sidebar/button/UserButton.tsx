import Link from "next/link";

import { AccountIcon } from "@/components/icon/AccountIcon";
import { BaseButton } from "@/components/button/BaseButton";
import { UserStore } from "@/modules/user/UserStore";
import { useShallow } from "zustand/react/shallow";

interface Props {
  onClick: () => void;
}

export const UserButton = (props: Props) => {
  const { object } = UserStore(useShallow((state) => ({
    object: state.object,
  })));

  return (
    <>
      {object && (
        <Link href={"/user/" + object.id()}>
          <BaseButton
            icon={<AccountIcon />}
            onClick={props.onClick}
            text={object.name()}
          />
        </Link>
      )}
    </>
  );
};
