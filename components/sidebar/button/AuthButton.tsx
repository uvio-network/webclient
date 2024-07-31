import * as Privy from "@privy-io/react-auth";

import { AuthStore } from "@/components/auth/AuthStore";
import { BaseButton } from "@/components/button/BaseButton";
import { LoginIcon } from "@/components/icon/LoginIcon";
import { LogoutIcon } from "@/components/icon/LogoutIcon";
import { useShallow } from "zustand/react/shallow";

export const AuthButton = () => {
  const { valid } = AuthStore(useShallow((state) => ({ valid: state.auth.valid })));

  const { login, logout } = Privy.usePrivy();

  return (
    <>
      {valid ? (
        <BaseButton
          onClick={logout}
          icon={<LogoutIcon />}
          text="Logout"
        />
      ) : (
        <BaseButton
          onClick={login}
          icon={<LoginIcon />}
          text="Login"
        />
      )}
    </>
  );
};
