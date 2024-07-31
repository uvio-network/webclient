import * as Privy from "@privy-io/react-auth";
import * as React from "react";
import * as ToastSender from "@/components/toast/ToastSender";

import { AuthMessage, AuthStore } from "@/components/auth/AuthStore";
import { truncateEthAddress } from "@/modules/wallet/WalletAddress";
import { UserCreate } from "@/modules/api/user/create/Create";
import { UserSearch } from "@/modules/api/user/search/Search";

export const AuthProvider = () => {
  const { authenticated, user, ready } = Privy.usePrivy();

  // TODO ensure we make the calls below only once per page reload
  React.useEffect(() => {
    const fetchData = async () => {
      const token = await Privy.getAccessToken();
      if (!token) {
        return ToastSender.Error("Haha, and you thought this would be easy!?");
      }

      try {
        await UserCreate(token, [{ image: "", name: truncateEthAddress(user?.wallet?.address) }]);
      } catch (err) {
        ToastSender.Error("Haha, and you thought this would be easy!?");
      }

      const auth: AuthMessage = {
        image: "",
        name: "",
        token: token,
        valid: true,
        wallet: user?.wallet?.address || "",
      };

      try {
        const [use] = await UserSearch(token, [{ id: "self" }]);
        auth.image = use.image;
        auth.name = use.name;
      } catch (err) {
        ToastSender.Error("Haha, and you thought this would be easy!?");
      }

      {
        AuthStore.getState().update(auth);
        console.log("AuthStore.update()")
      }
    };

    if (ready && authenticated) {
      fetchData();
    }
  }, [authenticated, user, ready]);

  // Every time the user's access token is granted or refreshed we update our
  // internal auth store. Conversely, if the user's access token was revoked, we
  // delete our internally tracked state as well.
  Privy.useToken({
    onAccessTokenGranted: (accessToken: string) => {
      AuthStore.getState().updateToken(accessToken);
      console.log("Privy.getAccessToken");
    },
    onAccessTokenRemoved: () => {
      AuthStore.getState().delete();
      console.log("useToken.onAccessTokenRemoved");
    },
  });

  return (
    <></>
  );
};
