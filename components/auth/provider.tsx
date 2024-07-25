import * as Auth from "@/components/auth/store";
import * as Privy from "@privy-io/react-auth";
import * as React from "react";

export const Provider = () => {
  const { getAccessToken } = Privy.usePrivy();

  Privy.useLogin({
    onComplete: async () => {
      try {
        const token = await getAccessToken();

        if (token) {
          Auth.useStore.getState().update({ ready: true, token: token });
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
      Auth.useStore.getState().update({ ready: false, token: "" });
    },
  });

  return (
    <></>
  );
};
