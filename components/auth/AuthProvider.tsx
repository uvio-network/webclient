import * as Privy from "@privy-io/react-auth";
import * as React from "react";
import * as ToastSender from "@/components/toast/ToastSender";

import { AuthStore } from "@/components/auth/AuthStore";
import { truncateEthAddress } from "@/modules/wallet/WalletAddress";
import { UserCreate } from "@/modules/api/user/create/Create";
import { UserSearch } from "@/modules/api/user/search/Search";

export const AuthProvider = () => {
  const [login, setLogin] = React.useState<boolean>(false);

  const { user } = Privy.usePrivy();
  const { wallets, ready } = Privy.useWallets();

  React.useEffect(() => {
    if (login && ready && user) {
      // We have to reset our login flag because consecutive logins require to
      // be waited for each. So if have a login once, but a user logs out and
      // logs in again, then we have to make sure that we are waiting for the
      // useLogin.onComplete very time. Otherwise the user's wallet information
      // will not be available to us.
      setLogin(false);

      // Finally process all external API calls and all data collected up to
      // this point in order to update our internal user store.
      fetchData(user, wallets);
    }
  }, [user, login, ready, wallets]);

  // Note that we need to use this login hook for all wallets top be available
  // on signup and login. Only if we set login to true we can proceed to fetch
  // our own data and setup our internal user store.
  Privy.useLogin({
    onComplete: () => {
      setLogin(true);
    },
  });

  Privy.useToken({
    // Every time the user's access token is refreshed we update our internal
    // auth store.
    onAccessTokenGranted: (accessToken: string) => {
      AuthStore.getState().updateToken(accessToken);
      console.log("useToken.onAccessTokenGranted");
    },
    // If the user's access token was revoked, we delete our internally tracked
    // state as well.
    onAccessTokenRemoved: () => {
      AuthStore.getState().delete();
      console.log("useToken.onAccessTokenRemoved");
    },
  });

  return (
    <></>
  );
};

const fetchData = async (user: Privy.User, wallets: Privy.ConnectedWallet[]) => {
  console.log("AuthProvider.fetchData");

  try {
    const token = await Privy.getAccessToken();
    if (!token) {
      return ToastSender.Error("Your access token could not be validated.");
    }

    // TODO setup smart account client

    // TODO get smart account address

    // TODO put smart wallet in its own Zustand Store

    const req = {
      image: "",
      name: truncateEthAddress(wallets[0]?.address),
      // TODO store the user's wallet config somehow
      //
      //     signer - the embedded privy wallet
      //     contract - the smart account address
      //     index - the smart account index
      //
    };

    const [cre] = await UserCreate(token, [req]);
    const [sea] = await UserSearch(token, [{ id: cre.id }]);

    const auth = {
      id: sea.id,
      image: sea.image,
      name: sea.name,
      token: token,
      valid: true,
      wallet: user?.wallet?.address || "",
    };

    {
      AuthStore.getState().update(auth);
    }
  } catch (err) {
    console.error(err);
    ToastSender.Error(err instanceof Error ? err.message : String(err));
  }
};
