import * as Privy from "@privy-io/react-auth";
import * as React from "react";
import * as ToastSender from "@/components/toast/ToastSender";

import { EnsureUser } from "@/modules/user/EnsureUser";
import { EnsureWallets } from "@/modules/wallet/EnsureWallets";
import { NewWalletContract } from "@/modules/wallet/WalletContract";
import { UserStore } from "@/modules/user/UserStore";
import { WalletStore } from "@/modules/wallet/WalletStore";

export const AuthProvider = () => {
  const [login, setLogin] = React.useState<boolean>(false);

  const { user } = Privy.usePrivy();
  const { wallets, ready } = Privy.useWallets();

  // The user may have all kinds of wallets connected using all kinds of apps
  // and browser extensions. We need to find the one that got embedded by Privy
  // and use that as signer for the user's smart account that we want to setup.
  const embedded = wallets.find((x) => {
    return x.connectorType === "embedded" && x.walletClientType === "privy";
  });

  React.useEffect(() => {
    if (embedded && login && ready && user) {
      // We have to reset our login flag because consecutive logins require to
      // be waited for each. So if have a login once, but a user logs out and
      // logs in again, then we have to make sure that we are waiting for the
      // useLogin.onComplete very time. Otherwise the user's wallet information
      // will not be available to us.
      setLogin(false);

      // Finally process all external API calls and all data collected up to
      // this point in order to update our internal user store.
      fetchData(user, embedded);
    }
  }, [embedded, login, ready, user]);

  // Note that we need to use this login hook for all wallets top be available
  // on signup and login. Only if we set login to true we can proceed to fetch
  // our own data and setup our internal user store.
  Privy.useLogin({
    onComplete: () => {
      setLogin(true);
      console.log("AuthProvider.onComplete");
    },
  });

  Privy.useToken({
    // Every time the user's access token is refreshed we update our internal
    // auth store.
    onAccessTokenGranted: (accessToken: string) => {
      UserStore.getState().updateToken(accessToken);
      console.log("AuthProvider.onAccessTokenGranted");
    },
    // If the user's access token was revoked, we delete our internally tracked
    // state as well.
    onAccessTokenRemoved: () => {
      UserStore.getState().delete();
      WalletStore.getState().delete();
      console.log("AuthProvider.onAccessTokenRemoved");
    },
  });

  return (
    <></>
  );
};

const fetchData = async (user: Privy.User, signer: Privy.ConnectedWallet) => {
  console.log("AuthProvider.fetchData");

  try {
    const token = await Privy.getAccessToken();
    if (!token) {
      return ToastSender.Error("Your access token could not be validated.");
    }

    const contract = await NewWalletContract(signer);
    const address = await contract.getAddress();

    // Ensure the user object first, and then ensure the user's wallet objects.
    // This order of operations is important, because ensuring the user's
    // wallets depends on the user object being properly prepared and available.
    {
      await EnsureUser(address, token);
      await EnsureWallets(contract, signer, token);
    }
  } catch (err) {
    console.error(err);
    ToastSender.Error(err instanceof Error ? err.message : String(err));
  }
};
