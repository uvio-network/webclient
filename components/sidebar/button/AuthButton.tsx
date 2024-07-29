import * as Privy from "@privy-io/react-auth";

import { BaseButton } from "@/components/button/BaseButton";
import { LoginIcon } from "@/components/icon/LoginIcon";
import { LogoutIcon } from "@/components/icon/LogoutIcon";

export const AuthButton = () => {
  const { authenticated, login, logout, ready } = Privy.usePrivy();

  return (
    <>
      {authenticated ? (
        <BaseButton
          disabled={!ready}
          onClick={logout}
          icon={<LogoutIcon />}
          text="Logout"
        />
      ) : (
        <BaseButton
          disabled={!ready}
          onClick={login}
          icon={<LoginIcon />}
          text="Login"
        />
      )}
    </>
  );
};
