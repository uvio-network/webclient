import Link from "next/link";

import * as React from "react";

import { BaseButton } from "@/components/button/BaseButton";
import { CurrencyDollarIcon } from "@/components/icon/CurrencyDollarIcon";
import { CurrentPulseIcon } from "@/components/icon/CurrentPulseIcon";
import { TokenStore } from "@/modules/token/TokenStore";
import { UserStore } from "@/modules/user/UserStore";
import { useShallow } from "zustand/react/shallow";
import { WalletStore } from "@/modules/wallet/WalletStore";

// T is the currently hard coded default token.
const T = "UVX";

export const WalletButton = () => {
  const { allocated, available } = TokenStore();
  const { wallet } = WalletStore();

  const { object } = UserStore(useShallow((state) => ({
    object: state.user.object,
  })));

  React.useEffect(() => {
    if (wallet.contract) {
      TokenStore.getState().updateBalance();
    }
  }, [wallet, wallet.contract]);

  return (
    <>
      {allocated[T] && object && (
        <Link href={"/user/" + object.id() + "/activity"}>
          <BaseButton
            icon={<CurrentPulseIcon />}
            text={allocated[T].balance.toFixed(allocated[T].precision)}
          />
        </Link>
      )}

      {available[T] && (
        <Link href={"/wallet/contract"}>
          <BaseButton
            icon={<CurrencyDollarIcon />}
            text={available[T].balance.toFixed(available[T].precision)}
          />
        </Link>
      )}
    </>
  );
};
