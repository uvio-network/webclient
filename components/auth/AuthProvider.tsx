import * as Privy from "@privy-io/react-auth";

import { AuthStore } from "@/components/auth/AuthStore";

export const AuthProvider = () => {
  Privy.useLogin({
    onComplete: async () => {
      try {
        const token = await Privy.getAccessToken();

        if (token) {
          AuthStore.getState().update({ ready: true, token: token });
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
      AuthStore.getState().update({ ready: false, token: "" });
    },
  });

  return (
    <></>
  );
};
