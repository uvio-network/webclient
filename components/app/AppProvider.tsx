"use client";

import * as Config from "@/modules/config";

import { AuthProvider } from "@/components/auth/AuthProvider";
import { ChainStore } from "@/modules/chain/ChainStore";
import { PrivyProvider } from "@privy-io/react-auth";
import { Sidebar } from "@/components/sidebar/Sidebar";
import { ToastProvider } from "@/components/toast/ToastProvider";

export const AppProvider = () => {
  const chain = ChainStore.getState();

  return (
    <>
      <PrivyProvider
        appId={Config.PrivyAppId}
        clientId={Config.PrivyClientId}
        config={{
          defaultChain: chain.getActive(),
          embeddedWallets: {
            // Create embedded wallets for users who don't have a wallet yet.
            createOnLogin: "users-without-wallets",
          },
          supportedChains: chain.getAll(),
        }}
      >
        <AuthProvider />
        <Sidebar />
      </PrivyProvider >

      <ToastProvider />
    </>
  );
}
