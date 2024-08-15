import Link from "next/link";

import * as React from "react";

import { BaseButton } from "@/components/button/BaseButton";
import { ChainStore } from "@/modules/chain/ChainStore";
import { CurrencyDollarIcon } from "@/components/icon/CurrencyDollarIcon";
import { CurrentPulseIcon } from "@/components/icon/CurrentPulseIcon";
import { TokenStore } from "@/modules/token/TokenStore";
import { UserStore } from "@/modules/user/UserStore";
import { useShallow } from "zustand/react/shallow";
import { WalletStore } from "@/modules/wallet/WalletStore";

export const WalletButton = () => {
  const { token } = TokenStore();
  const { wallet } = WalletStore();

  const { object } = UserStore(useShallow((state) => ({
    object: state.user.object,
  })));

  const chain = ChainStore.getState().getActive();

  React.useEffect(() => {
    if (wallet.contract) {
      TokenStore.getState().update(wallet, chain.tokens);
    }
  }, [wallet, wallet.contract, chain.tokens]);

  return (
    <>
      {object && (
        <Link href={"/user/" + object.id() + "/activity"}>
          <BaseButton
            icon={<CurrentPulseIcon />}
            text={object.staked("UVX").toFixed(2)}
          />
        </Link>
      )}

      {token["UVX"] && (
        <Link href={"/wallet/contract"}>
          <BaseButton
            icon={<CurrencyDollarIcon />}
            text={token["UVX"]}
          />
        </Link>
      )}
    </>
  );
};
