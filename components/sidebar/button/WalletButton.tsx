import Link from "next/link";

import * as React from "react";
import * as ToastSender from "@/components/toast/ToastSender";

import { BaseButton } from "@/components/button/BaseButton";
import { ChainStore } from "@/modules/chain/ChainStore";
import { CurrencyDollarIcon } from "@/components/icon/CurrencyDollarIcon";
import { CurrentPulseIcon } from "@/components/icon/CurrentPulseIcon";
import { TokenStore } from "@/modules/token/TokenStore";
import { WalletStore } from "@/modules/wallet/WalletStore";

export const WalletButton = () => {
  const { token } = TokenStore();
  const { wallet } = WalletStore();

  const chain = ChainStore.getState().getActive();

  const onClick = () => {
    ToastSender.Info("It's comming just chill ok!");
  };

  React.useEffect(() => {
    if (wallet.contract) {
      TokenStore.getState().update(wallet, chain.tokens);
    }
  }, [wallet.contract]);

  return (
    <>
      {wallet.ready && (
        <>
          <BaseButton
            icon={<CurrentPulseIcon />}
            onClick={onClick}
            text={"00.00"}
          />

          <Link href={"/wallet/contract"}>
            <BaseButton
              icon={<CurrencyDollarIcon />}
              text={token["UVX"] || "00.00"}
            />
          </Link>
        </>
      )}
    </>
  );
};
