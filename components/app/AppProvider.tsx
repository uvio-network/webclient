"use client";

import * as Config from "@/modules/config";

import { AuthProvider } from "@/components/auth/AuthProvider";
import { PrivyProvider } from "@privy-io/react-auth";
import { Sidebar } from "@/components/sidebar/Sidebar";
import { ToastProvider } from "@/components/toast/ToastProvider";

export const AppProvider = () => {
  return (
    <>
      <PrivyProvider
        appId={Config.PrivyAppID}
        clientId={Config.PrivyClientID}
        config={{
          // Create embedded wallets for users who don't have a wallet yet.
          embeddedWallets: {
            createOnLogin: "users-without-wallets",
          },
        }}
      >
        <Sidebar />
        <AuthProvider />
      </PrivyProvider>

      <ToastProvider />
    </>
  );
}
