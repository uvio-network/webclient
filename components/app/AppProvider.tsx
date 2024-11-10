"use client";

import * as Config from "@/modules/config";

import { AuthProvider } from "@/components/auth/AuthProvider";
import { ChainStore } from "@/modules/chain/ChainStore";
import { NotificationProvider } from "@/components/notification/NotificationProvider";
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
          defaultChain: ChainStore.getState().getActive(),
          embeddedWallets: {
            // Create embedded wallets for users who don't have a wallet yet.
            createOnLogin: "users-without-wallets",
          },
          supportedChains: ChainStore.getState().getAll(),
        }}
      >
        <AuthProvider />
        <Sidebar />
      </PrivyProvider >

      <NotificationProvider />
      <ToastProvider />
    </>
  );
}
