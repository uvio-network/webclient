import * as Privy from "@privy-io/react-auth";

import { Address } from "viem";
import { ChainStore } from "@/modules/chain/ChainStore";
import { createWalletClient } from "viem";
import { custom } from "viem";
import { Hex } from "viem";
import { NewPublicClient } from "@/modules/chain/PublicClient";
import { parseGwei } from "viem";
import { PublicClient } from "viem";
import { Receipt } from "@/modules/wallet/WalletInterface";
import { Signer } from "@/modules/wallet/WalletInterface";
import { Transaction } from "@/modules/transaction/Transaction";
import { TransactionReceipt } from "viem";
import { WalletClient } from "viem";

export const NewWalletInjected = async (wal: Privy.ConnectedWallet): Promise<Signer> => {
  const active = ChainStore.getState().getActive();
  const provider = await wal.getEthereumProvider();

  const cli = createWalletClient({
    chain: active,
    transport: custom(provider),
  });

  // This entire wallet ecosystem is an absolute disaster. If users choose to
  // connect with their own wallet, then they may not have the required chain
  // configured. E.g. Base Sepolia is not widely established in standard
  // configurations. Switching to the active chain may fail for that reason, but
  // it is practically impossible to assert a specific error or error structure.
  // So below we take a guess, close our eyes and pray.
  try {
    {
      await cli.switchChain({ id: active.id });
    }
  } catch {
    try {
      await cli.addChain({ chain: active });
    } catch { }

    {
      await cli.switchChain({ id: active.id });
    }
  }

  return new Injected(cli, wal);
};

class Injected implements Signer {
  private cli: WalletClient;
  private inj: Privy.ConnectedWallet;
  private pub: PublicClient;

  constructor(cli: WalletClient, inj: Privy.ConnectedWallet) {
    this.cli = cli;
    this.inj = inj;
    this.pub = NewPublicClient();
  }

  address(): Address {
    return this.inj.address as Address;
  }

  connectorType(): string {
    return "injected";
  }

  async sendTransaction(txn: Transaction[], bef: () => void, aft: () => void): Promise<Receipt> {
    const rec: TransactionReceipt[] = [];

    for (const x of txn) {
      bef();

      const has = await this.cli.sendTransaction({
        account: this.address(),
        data: x.data as Hex,
        to: x.to as Address,
        chain: this.cli.chain,
        maxFeePerGas: parseGwei("6"),
        maxPriorityFeePerGas: parseGwei("0.5"),
      });

      aft();

      rec.push(await this.pub.waitForTransactionReceipt({
        hash: has,
      }));
    }

    const las = rec[rec.length - 1];

    return {
      hash: las.transactionHash,
      rejected: false,
      success: las.status.toLowerCase() === "success" ? true : false,
    };
  }
}
