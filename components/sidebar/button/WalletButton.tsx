import { ArbitrumSepoliaUvioMarketsContract } from "@/modules/config";
import { BaseButton } from "@/components/button/BaseButton";
import { CurrencyDollarIcon } from "@/components/icon/CurrencyDollarIcon";
import { CurrentPulseIcon } from "@/components/icon/CurrentPulseIcon";
import { Markets } from "@/modules/abi/Markets";
import { WalletStore } from "@/modules/wallet/WalletStore";
import { NewPublicClient } from "@/modules/chain/PublicClient";

import { Address } from "viem";
import { BiconomySmartAccountV2, Transaction } from "@biconomy/account";
import { encodeFunctionData } from "viem";
import { getContract } from "viem";
import { PublicClient } from "viem";
import { parseUnits } from "viem";
import { PaymasterMode } from "@biconomy/account";
import { UVX } from "@/modules/abi/UVX";
import { InfoCircleIcon } from "@/components/icon/InfoCircleIcon";

export const WalletButton = () => {
  const { wallet } = WalletStore();

  const client = NewPublicClient();

  return (
    <>
      {wallet.ready && (
        <>
          <BaseButton
            icon={<CurrentPulseIcon />}
            onClick={() => readMarkets(client)}
            text={"00,00"}
          />

          <BaseButton
            icon={<CurrencyDollarIcon />}
            onClick={() => readUVX(client)}
            text={"00,00"}
          />

          <BaseButton
            icon={<InfoCircleIcon />}
            onClick={() => depositMarkets(wallet.contract!.contract()!)}
            text={"Deposit"}
          />
        </>
      )}
    </>
  );
};

const contract = "0x0fc545Cded57eFEEE0ab398a978590AA7F7A3b56" as Address; // smart account
const markets = ArbitrumSepoliaUvioMarketsContract as Address; // Markets contract
const token = "0x626D4ec870Bf00D03718E5F3b98D7C0b249D5883" as Address; // UVX contract
const signer = "0x2AA81DDd6611A954Dae9901774FA52b6FABEa0e7" as Address; // embedded wallet

const newApprove = (): Transaction => {
  const amount = parseUnits("10", 18);

  const encodedCall = encodeFunctionData({
    abi: UVX,
    functionName: "approve",
    args: [markets, amount],
  });

  return {
    to: token,
    data: encodedCall,
  };
}

const newDeposit = (): Transaction => {
  const amount = parseUnits("10", 18);

  const encodedCall = encodeFunctionData({
    abi: Markets,
    functionName: "deposit",
    args: [amount, token, contract],
  });

  return {
    to: markets,
    data: encodedCall,
  };
}

const depositMarkets = async (con: BiconomySmartAccountV2) => {
  const app = newApprove();
  const dep = newDeposit();

  const opt = {
    paymasterServiceData: { mode: PaymasterMode.SPONSORED },
  }

  const userOpResponse = await con.sendTransaction([app, dep], opt);

  const res = await userOpResponse.wait();

  console.log("DEPOSIT MARKETS", res, res.receipt.transactionHash);
};

const readMarkets = async (client: PublicClient) => {
  const con = getContract({
    abi: Markets,
    address: markets,
    client: client,
  })

  const [userBalance] = await Promise.all([
    con.read.userBalance([token, signer]),
  ])

  console.log("READ MARKETS", userBalance);
};

const readUVX = async (client: PublicClient) => {
  const con = getContract({
    abi: UVX,
    address: token,
    client: client,
  })

  const [c, s] = await Promise.all([
    con.read.balanceOf([contract]),
    con.read.balanceOf([signer]),
  ])

  console.log("READ UVX C", c);
  console.log("READ UVX S", s);
};
