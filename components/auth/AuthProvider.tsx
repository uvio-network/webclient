import * as Privy from "@privy-io/react-auth";
import * as React from "react";
import * as ToastSender from "@/components/toast/ToastSender";

import { AuthStore } from "@/components/auth/AuthStore";
import { UserCreate } from "@/modules/api/user/create/Create";

export const AuthProvider = () => {
  const { ready, wallets } = Privy.useWallets();

  React.useEffect(() => {
    if (ready) {
      AuthStore.getState().updateWallet(wallets[0]?.address || "");
    }
  }, [ready, wallets]);

  Privy.useLogin({
    onComplete: async (user: Privy.User, isNewUser: boolean) => {
      if (!isNewUser) return;

      try {
        await UserCreate(AuthStore.getState().auth.token, [{ image: "", name: "" }]);
      } catch (err) {
        ToastSender.Error("Haha, and you thought this would be easy!?");
      }
    },
  });

  Privy.useToken({
    onAccessTokenGranted: (accessToken: string) => {
      AuthStore.getState().updateToken(accessToken);
      console.trace("useToken.onAccessTokenGranted");
    },
    onAccessTokenRemoved: () => {
      AuthStore.getState().updateToken("");
      console.trace("useToken.onAccessTokenRemoved");
    },
  });

  return (
    <></>
  );
};
