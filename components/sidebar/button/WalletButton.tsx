import Link from "next/link";

import * as React from "react";
import * as ToastSender from "@/components/toast/ToastSender";

import { BaseButton } from "@/components/button/BaseButton";
import { CurrencyDollarIcon } from "@/components/icon/CurrencyDollarIcon";
import { CurrentPulseIcon } from "@/components/icon/CurrentPulseIcon";
import { Sleep } from "@/modules/sleep/Sleep";
import { TokenStore } from "@/modules/token/TokenStore";
import { UserStore } from "@/modules/user/UserStore";
import { useShallow } from "zustand/react/shallow";
import { WalletStore } from "@/modules/wallet/WalletStore";
import moment from "moment";

// T is the currently hard coded default token.
const T = "UVX";

interface Props {
  onClick: () => void;
}

export const WalletButton = (props: Props) => {
  const { allocated, available } = TokenStore();
  const { ready } = WalletStore();

  const { user } = UserStore(useShallow((state) => ({
    user: state.object,
  })));

  // Make sure we update balances every time the user enters or refreshes the
  // page.
  React.useEffect(() => {
    if (ready) {
      TokenStore.getState().updateBalance();
    }
  }, [ready]);

  // Additionally to the above, make sure that we update balances every 2
  // seconds if the user registered just now, as long as its balance is zero.
  React.useEffect(() => {
    if (!user || !ready) {
      return;
    }

    // If the user has a balance, or if the user is older than 60 seconds, don't
    // do anything here.
    if (moment.utc().diff(user.created(), "seconds") > 60) {
      return;
    }

    let mnt = true;

    const loop = async () => {
      while (mnt) {
        {
          await Sleep(2 * 1000);
        }

        const bef = TokenStore.getState().available[T]?.balance || 0;

        // If we get here, update balances for the first 60 seconds of a user's
        // lifetime as long as its balance is zero.
        const avl = bef === 0;
        const rec = moment.utc().diff(user.created(), "seconds") <= 60;

        if (avl && rec) {
          {
            await TokenStore.getState().updateBalance();
          }

          const aft = TokenStore.getState().available[T]?.balance || 0;

          // We are comparing the available balances before and after updating
          // balances, and if the new balance is greater than the balance
          // before, it implies the user got UVX tokens minted to its wallet. In
          // that case we show a toast and let them know what happened.
          if (aft > bef) {
            ToastSender.Success("Baller mode enabled, you got 100 UVX 'cause you cute!");
          }
        } else {
          break;
        }
      }
    };

    loop();

    return () => {
      mnt = false;
    };
  }, [ready, user]);

  return (
    <>
      {allocated[T] && user && (
        <Link href={"/user/" + user.id() + "/activity"}>
          <BaseButton
            effect={true}
            icon={<CurrentPulseIcon />}
            onClick={props.onClick}
            text={allocated[T].balance.toFixed(allocated[T].precision)}
          />
        </Link>
      )}

      {available[T] && (
        <Link href={"/wallet/contract"}>
          <BaseButton
            effect={true}
            icon={<CurrencyDollarIcon />}
            onClick={props.onClick}
            text={available[T].balance.toFixed(available[T].precision)}
          />
        </Link>
      )}
    </>
  );
};
