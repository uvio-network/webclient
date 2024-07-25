import * as Auth from "@/components/auth/provider";
import * as Config from "@/modules/config";
import * as Privy from "@privy-io/react-auth";
import * as Toast from "@/components/toast/provider";

import { Sidebar } from "@/components/sidebar/Sidebar";

export const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Privy.PrivyProvider
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
      The sidebar component should remain above the rest of the child
      components because of the stacking order within the dom.  Keeping the
      sidebar here ensures all of our tooltips are readable from anywhere any
      time.
      */}
      <Sidebar />

      {children}

      <Auth.Provider />
      <Toast.Provider />
    </Privy.PrivyProvider>
  );
}
