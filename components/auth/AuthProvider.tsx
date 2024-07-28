import * as Privy from "@privy-io/react-auth";
import * as ToastSender from "@/components/toast/ToastSender";

import { AuthStore } from "@/components/auth/AuthStore";
import { UserCreate } from "@/modules/api/user/create/Create";

export const AuthProvider = () => {
  Privy.useCreateWallet({
    onSuccess: (wallet: Privy.Wallet) => {
      AuthStore.getState().updateWallet(wallet.address);
      console.trace("useCreateWallet.onSuccess");
    },
  });

  Privy.useLogin({
    onComplete: async (user: Privy.User, isNewUser: boolean) => {
      if (!isNewUser) return;

      try {
        await UserCreate(AuthStore.getState().auth.token, [{ image: "", name: "" }]);
      } catch (err) {
        ToastSender.Error("Haha, and you thought this would be easy!?");
      }

      console.trace("useLogin.onComplete");
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
