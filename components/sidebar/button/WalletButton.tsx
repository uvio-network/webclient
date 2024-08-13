import Link from "next/link";

import * as React from "react";
import * as ToastSender from "@/components/toast/ToastSender";

import { BaseButton } from "@/components/button/BaseButton";
import { ChainStore } from "@/modules/chain/ChainStore";
import { CurrencyDollarIcon } from "@/components/icon/CurrencyDollarIcon";
import { CurrentPulseIcon } from "@/components/icon/CurrentPulseIcon";
import { WalletStore } from "@/modules/wallet/WalletStore";

import { Address } from "viem";
import { Transaction } from "@biconomy/account";
import { encodeFunctionData } from "viem";
import { getContract } from "viem";
import { parseUnits } from "viem";
import { PaymasterMode } from "@biconomy/account";
import { TokenConfig } from "@/modules/token/TokenConfig";
import { TokenStore } from "@/modules/token/TokenStore";

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

const newApprove = (amount: number, token: TokenConfig): Transaction => {
  const chain = ChainStore.getState().getActive();
  const markets = chain.contracts["Markets"];

  const encodedCall = encodeFunctionData({
    abi: token.abi,
    functionName: "approve",
    args: [
      markets.address,
      parseUnits(String(amount), token.decimals),
    ],
  });

  return {
    to: token.address,
    data: encodedCall,
  };
}

const newDeposit = (amount: number, token: TokenConfig): Transaction => {
  const chain = ChainStore.getState().getActive();
  const markets = chain.contracts["Markets"];
  const wallet = WalletStore.getState().wallet;
  const contract = wallet.contract!;

  const encodedCall = encodeFunctionData({
    abi: markets.abi,
    functionName: "deposit",
    args: [
      parseUnits(String(amount), token.decimals),
      token.address,
      contract.address(),
    ],
  });

  return {
    to: markets.address,
    data: encodedCall,
  };
}

const depositMarkets = async (amount: number, token: TokenConfig) => {
  const wallet = WalletStore.getState().wallet;
  const contract = wallet.contract?.contract()!;

  const app = newApprove(amount, token);
  const dep = newDeposit(amount, token);

  const opt = {
    paymasterServiceData: { mode: PaymasterMode.SPONSORED },
  }

  const userOpResponse = await contract.sendTransaction([app, dep], opt);

  const res = await userOpResponse.wait();

  console.log("DEPOSIT MARKETS", res.success, res.receipt.transactionHash);
};

const readDeposit = async (token: TokenConfig) => {
  const chain = ChainStore.getState().getActive();
  const markets = chain.contracts["Markets"];
  const wallet = WalletStore.getState().wallet;

  const con = getContract({
    abi: markets.abi,
    address: markets.address as Address,
    client: wallet.public!,
  })

  const [userBalance] = await Promise.all([
    con.read.userBalance([
      token.address,
      wallet.contract?.address(),
    ]),
  ])

  console.log("READ DEPOSIT", userBalance);
};
