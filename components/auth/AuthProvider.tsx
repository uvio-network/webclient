import * as Privy from "@privy-io/react-auth";
import * as React from "react";
import * as ToastSender from "@/components/toast/ToastSender";

import { EnsureUser } from "@/modules/user/EnsureUser";
import { EnsureWallets } from "@/modules/wallet/EnsureWallets";
import { LoadingStore } from "@/components/loading/LoadingStore";
import { Sleep } from "@/modules/sleep/Sleep";
import { TokenStore } from "@/modules/token/TokenStore";
import { UserStore } from "@/modules/user/UserStore";
import { WalletStore } from "@/modules/wallet/WalletStore";
import { WalletObject } from "@/modules/wallet/WalletObject";

export const AuthProvider = () => {
  const [alreadyLoggedIn, setAlreadyLoggedIn] = React.useState<boolean>(false);
  const [login, setLogin] = React.useState<boolean>(false);

  const { authenticated, logout, user } = Privy.usePrivy();
  const { wallets, ready } = Privy.useWallets();

  // The user may have all kinds of wallets connected using all kinds of apps
  // and browser extensions. We do only consider the wallet that was connected
  // most recently.
  let wallet: Privy.ConnectedWallet | undefined;
  if (ready) {
    const sorted = wallets.sort((a, b) => b.connectedAt - a.connectedAt);
    wallet = sorted[0];
  }

  // Continuously check the user's access token in order to update it before it
  // expires.
  React.useEffect(() => {
    let mnt = true;

    const loop = async () => {
      while (mnt) {
        await updateToken();
        await Sleep(60 * 1000);
      }
    };

    loop();

    return () => {
      mnt = false;
    };
  });

  React.useEffect(() => {
    // For every unauthenticated request we have to acknowledge that the
    // intended page can continue to render. So once we know that the wallet
    // interface is ready and that the user could not be authenticated in Privy,
    // we signal our own loading store to continue rendering.
    if (!authenticated && ready) {
      LoadingStore.getState().authorized();
    }

    // It may happen that users disconnect from our dApp using the permission
    // management of their own wallet extension. Those external permissions may
    // brick our internal authorization in a way that Privy thinks the user is
    // already logged in, but the permission on the browser extension side
    // prevented the connection with the user's wallet to be established. For us
    // that means that we need to logout the user if Privy thinks the user is
    // authenticated, while the user decided to logout on their end.
    if (alreadyLoggedIn && authenticated && ready && wallets.length === 0) {
      logout();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [alreadyLoggedIn, authenticated, ready, wallets]);

  React.useEffect(() => {
    if (authenticated && login && user && wallet) {
      // We have to reset our alreadyLoggedIn and login flags in any event,
      // because consecutive logins need to be treated separately.
      setAlreadyLoggedIn(false);
      setLogin(false);

      // Finally process all external API calls and all data collected up to
      // this point in order to update our internal user store.
      setupAuth(user, wallet);
    }
  }, [authenticated, login, user, wallet]);

  Privy.useLogin({
    onComplete: (user, isNewUser, wasAlreadyAuthenticated) => {
      // Note that we need to use this login hook to manage the edge case of
      // users disconnecting their wallets from within their own wallet
      // extensions. For those edge cases we need to track which of our users
      // was already logged in.
      setAlreadyLoggedIn(wasAlreadyAuthenticated);

      // Additionally, we also have to track some signal for the login to be
      // completed. Only once the user login has concluded can we proceed with
      // our own API calls. If we ignore the login flag, we will end up making
      // apiserver calls twice over.
      setLogin(true);
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
      TokenStore.getState().delete();
      UserStore.getState().delete();
      WalletStore.getState().delete();
      console.log("AuthProvider.onAccessTokenRemoved");
    },
  });

  return (
    <></>
  );
};

const setupAuth = async (user: Privy.User, wallet: Privy.ConnectedWallet) => {
  try {
    const tok = await Privy.getAccessToken();
    if (!tok) {
      return ToastSender.Error("Your access token could not be validated.");
    }

    const wal = await new WalletObject().create(wallet);

    // Ensure the user object first, and then ensure the user's wallet objects.
    // This order of operations is important, because ensuring the user's
    // wallets depends on the user object being properly prepared and available.
    {
      await EnsureUser(wal.address(), tok);
      LoadingStore.getState().authorized();
      await EnsureWallets(wal, tok);
    }

    {
      console.log("AuthProvider.setupAuth");
    }
  } catch (err) {
    console.error(err);
    ToastSender.Error(err instanceof Error ? err.message : String(err));
  }
};

const updateToken = async () => {
  const des = await Privy.getAccessToken();
  const cur = UserStore.getState().user.token;

  if (des && des != cur) {
    UserStore.getState().updateToken(des);
    console.log("AuthProvider.updateToken");
  }
};
