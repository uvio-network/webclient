import * as Privy from "@privy-io/react-auth";

import { AuthStore } from "@/components/auth/AuthStore";

export const AuthProvider = () => {
  // Privy.useCreateWallet({
  //   onSuccess: (wallet: Privy.Wallet) => {
  //     //TODO
  //   },
  // });

  Privy.useLogin({
    onComplete: async (user: Privy.User) => {
      try {
        const token = await Privy.getAccessToken();

        if (token) {
          AuthStore.getState().update({
            token: token,
            valid: true,
            wallet: user.wallet?.address || "",
          });
        } else {
          console.error('Error fetching access token: null');
        }
      } catch (error) {
        console.error('Error fetching access token:', error);
      }
    },
    onError: (error) => {
      console.error('Error logging in:', error);
    },
  });

  Privy.useLogout({
    onSuccess: () => {
      AuthStore.getState().update({
        token: "",
        valid: false,
        wallet: "",
      });
    },
  });

  return (
    <></>
  );
};
