import * as Privy from "@privy-io/react-auth";
import * as React from "react";
import * as ToastSender from "@/components/toast/ToastSender";

import { AuthStore } from "@/components/auth/AuthStore";
import { ChainConfig } from "@/modules/chain/ChainConfig";
import { NewWalletContract } from "@/modules/wallet/WalletContract";
import { truncateEthAddress } from "@/modules/wallet/WalletAddress";
import { UserCreate } from "@/modules/api/user/create/Create";
import { UserSearch } from "@/modules/api/user/search/Search";
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
      console.log("useLogin.onComplete");
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
      WalletStore.getState().delete();
      console.log("useToken.onAccessTokenRemoved");
    },
  });

  return (
    <></>
  );
};

const fetchData = async (user: Privy.User, wallet: Privy.ConnectedWallet) => {
  console.log("AuthProvider.fetchData");

  try {
    const token = await Privy.getAccessToken();
    if (!token) {
      return ToastSender.Error("Your access token could not be validated.");
    }

    {
      // TODO this should be NewWallet
      // TODO this should use the ChainStore internally
      // TODO this should fetch wallet objects for the user or create new ones
      await NewWalletContract(wallet, ChainConfig[0]);
      await newUser(wallet, token);
    }
  } catch (err) {
    console.error(err);
    ToastSender.Error(err instanceof Error ? err.message : String(err));
  }
};

const newUser = async (wallet: Privy.ConnectedWallet, token: string) => {
  const req = {
    image: "",
    name: truncateEthAddress(wallet.address),
  };

  const [cre] = await UserCreate(token, [req]);
  const [sea] = await UserSearch(token, [{ id: cre.id }]);

  {
    AuthStore.getState().update({
      id: sea.id,
      image: sea.image,
      name: sea.name,
      token: token,
      valid: true,
      wallet: wallet.address,
    });
  }
};
