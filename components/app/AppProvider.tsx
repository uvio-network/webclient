"use client";

import * as Config from "@/modules/config";

import { AuthProvider } from "@/components/auth/AuthProvider";
import { ChainConfig } from "@/modules/chain/ChainConfig";
import { PrivyProvider } from "@privy-io/react-auth";
import { Sidebar } from "@/components/sidebar/Sidebar";
import { ToastProvider } from "@/components/toast/ToastProvider";

export const AppProvider = () => {
  return (
    <>
      <PrivyProvider
        appId={Config.PrivyAppId}
        clientId={Config.PrivyClientId}
        config={{
          supportedChains: ChainConfig,
          embeddedWallets: {
            // Create embedded wallets for users who don't have a wallet yet.
            createOnLogin: "users-without-wallets",
            // Disable transaction confirmations in order to make account
            // abstraction work. When we use gas sponsorships for users, then
            // users do not have to confirm transactions, because they are also
            // not paying for the gas anymore.
            noPromptOnSignature: true,
          },
        }}
      >
        <Sidebar />
        <AuthProvider />
      </PrivyProvider >

      <ToastProvider />
    </>
  );
}
