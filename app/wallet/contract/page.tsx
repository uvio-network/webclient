"use client";

import Link from "next/link";

import * as React from "react";
import * as ToastSender from "@/components/toast/ToastSender";

import { BaseButton } from "@/components/button/BaseButton";
import { ChainStore } from "@/modules/chain/ChainStore";
import { CopyIcon } from "@/components/icon/CopyIcon";
import { EditorButton } from "@/components/editor/EditorButton";
import { LoadingStore } from "@/components/loading/LoadingStore";
import { OpenLinkIcon } from "@/components/icon/OpenLinkIcon";
import { RefreshIcon } from "@/components/icon/RefreshIcon";
import { TokenConfig } from "@/modules/token/TokenConfig";
import { TokenStore } from "@/modules/token/TokenStore";
import { WalletStore } from "@/modules/wallet/WalletStore";

export default function Page() {
  const [deposit, setDeposit] = React.useState<boolean>(true);

  const { available } = TokenStore();
  const { wallet } = WalletStore();

  const chain = ChainStore.getState().getActive();

  const onClick = () => {
    ToastSender.Info("It's comming just chill ok!");
  };

  {
    const { loaded, loading } = LoadingStore();

    React.useEffect(() => {
      loaded();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (wallet?.object === undefined || loading) return <></>;
  }

  return (
    <>
      <div className="flex mb-6 w-full items-center">
        <EditorButton
          active={deposit}
          onClick={() => setDeposit(true)}
          text="Deposit"
        />

        <EditorButton
          active={!deposit}
          // onClick={() => setDeposit(false)}
          onClick={onClick}
          text="Withdraw"
        />
      </div>

      {deposit ? (
        <>
          <div className="text-sm">
            This is your smart contract wallet that only you control. You can fund your wallet by sending any of the whitelisted tokens to your wallet address below. Make sure that you only send tokens to your smart contract wallet that you want to use on the Uvio platform.
          </div>

          <div className="flex my-4 p-4 bg-gray-50 dark:bg-gray-900 rounded">
            <div className="w-full text-gray-500 dark:text-gray-400 font-mono overflow-auto">
              {wallet.object.address()}
            </div>
            <div className="my-auto mx-2">
              <BaseButton
                background="none"
                onClick={onClick}
                padding="p-0"
                icon={<CopyIcon />}
              />
            </div>
            <div className="my-auto">
              <Link
                href={`${chain.blockExplorers?.default.url}/address/${wallet.object.address()}#tokentxns`}
                target="_blank"
              >
                <BaseButton
                  background="none"
                  padding="p-0"
                  icon={<OpenLinkIcon />}
                />
              </Link>
            </div>
          </div>

          <div className="my-4 px-4">
            {Object.entries(chain.tokens).map(([key, val]: [string, TokenConfig], i: number) => (
              <div
                key={val.address}
                className="flex py-2"
              >
                <div className="w-full">
                  {key}
                </div>
                <div className="w-full">
                  {available[key] && (
                    <>
                      {available[key].balance.toFixed(available[key].precision)}
                    </>
                  )}
                </div>
                <div className="my-auto mr-2">
                  <BaseButton
                    background="none"
                    onClick={() => {
                      TokenStore.getState().updateBalance();
                    }}
                    confirm={true}
                    padding="p-0"
                    icon={<RefreshIcon />}
                    timeout={10}
                  />
                </div>
                <div className="my-auto">
                  <Link
                    href={`${chain.blockExplorers?.default.url}/token/${val.address}?a=${wallet.object.address()}`}
                    target="_blank"
                  >
                    <BaseButton
                      background="none"
                      padding="p-0"
                      icon={<OpenLinkIcon />}
                    />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          WIP
        </>
      )}
    </>
  );
};
