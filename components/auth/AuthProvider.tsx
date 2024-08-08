import * as Privy from "@privy-io/react-auth";
import * as React from "react";
import * as ToastSender from "@/components/toast/ToastSender";

import { AuthStore } from "@/components/auth/AuthStore";
import { truncateEthAddress } from "@/modules/wallet/WalletAddress";
import { UserCreate } from "@/modules/api/user/create/Create";
import { UserSearch } from "@/modules/api/user/search/Search";

export const AuthProvider = () => {
  const { user } = Privy.usePrivy();
  const { wallets, ready } = Privy.useWallets();

  const [login, setLogin] = React.useState<boolean>(false);

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
      if (AuthStore.getState().auth.valid) {
        AuthStore.getState().updateToken(accessToken);
        console.log("useToken.onAccessTokenGranted");
      }
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

  const token = await Privy.getAccessToken();
  if (!token) {
    return ToastSender.Error("Haha, and you thought this would be easy!?");
  }

  try {
    await UserCreate(token, [{ image: "", name: truncateEthAddress(wallets[0]?.address) }]);
  } catch (err) {
    return ToastSender.Error("Haha, and you thought this would be easy!?");
  }

  const auth = {
    id: "",
    image: "",
    name: "",
    token: token,
    valid: true,
    wallet: user?.wallet?.address || "",
  };

  try {
    const [use] = await UserSearch(token, [{ id: "self" }]);
    auth.id = use.id;
    auth.image = use.image;
    auth.name = use.name;
  } catch (err) {
    return ToastSender.Error("Haha, and you thought this would be easy!?");
  }

  {
    AuthStore.getState().update(auth);
  }
};
