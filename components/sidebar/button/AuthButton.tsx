import * as Privy from "@privy-io/react-auth";

import { BaseButton } from "@/components/button/BaseButton";
import { LoginIcon } from "@/components/icon/LoginIcon";
import { LogoutIcon } from "@/components/icon/LogoutIcon";
import { UserStore } from "@/modules/user/UserStore";
import { useShallow } from "zustand/react/shallow";

interface Props {
  onClick: () => void;
}

export const AuthButton = (props: Props) => {
  const { valid } = UserStore(useShallow((state) => ({
    valid: state.user.valid,
  })));

  const { login, logout } = Privy.usePrivy();

  return (
    <>
      {valid ? (
        <BaseButton
          icon={<LogoutIcon />}
          onClick={() => {
            logout();
            props.onClick();
          }}
          text="Logout"
        />
      ) : (
        <BaseButton
          icon={<LoginIcon />}
          onClick={() => {
            login();
            props.onClick();
          }}
          text="Login"
        />
      )}
    </>
  );
};
