import * as Button from "@/components/sidebar/button/base";
import * as Privy from "@privy-io/react-auth";
import * as React from "react";

import { LoginIcon } from "@/components/icon/LoginIcon";
import { LogoutIcon } from "@/components/icon/LogoutIcon";

export const Auth = () => {
  const { authenticated, login, logout, ready } = Privy.usePrivy();

  return (
    <>
      {authenticated ? (
        <Button.Base
          disabled={!ready}
          onClick={logout}
          icon={<LogoutIcon />}
          text="Logout"
        />
      ) : (
        <Button.Base
          disabled={!ready}
          onClick={login}
          icon={<LoginIcon />}
          text="Login"
        />
      )}
    </>
  );
};
