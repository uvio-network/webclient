import Link from "next/link";

import { BaseButton } from "@/components/button/BaseButton";
import { CurrencyDollarIcon } from "@/components/icon/CurrencyDollarIcon";
import { CurrentPulseIcon } from "@/components/icon/CurrentPulseIcon";
import { WalletStore } from "@/modules/wallet/WalletStore";

export const WalletButton = () => {
  const { wallet } = WalletStore();

  return (
    <>
      {wallet.address && (
        <>
          <Link href={"/todo"}>
            <BaseButton
              icon={<CurrentPulseIcon />}
              text={"25,00"}
            />
          </Link>

          <Link href={"/todo"}>
            <BaseButton
              icon={<CurrencyDollarIcon />}
              text={"100,00"}
            />
          </Link>
        </>
      )}
    </>
  );
};
