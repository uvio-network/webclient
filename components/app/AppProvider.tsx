import * as Config from "@/modules/config";

import { AuthProvider } from "@/components/auth/AuthProvider";
import { PrivyProvider } from "@privy-io/react-auth";
import { Sidebar } from "@/components/sidebar/Sidebar";
import { ToastProvider } from "@/components/toast/ToastProvider";

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
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
      {/*
      The sidebar component should remain above the rest of the child components
      because of the stacking order within the dom. Keeping the sidebar here
      ensures all of our tooltips are readable from anywhere any time.
      */}
      <Sidebar />

      {children}

      <AuthProvider />
      <ToastProvider />
    </PrivyProvider>
  );
}
