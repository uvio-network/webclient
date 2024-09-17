import * as Privy from "@privy-io/react-auth";

import { Address } from "viem";
import { NewPublicClient } from "@/modules/chain/PublicClient";
import { NewWalletEmbedded } from "@/modules/wallet/WalletEmbedded";
import { NewWalletInjected } from "@/modules/wallet/WalletInjected";
import { PublicClient } from "viem";
import { Receipt } from "@/modules/wallet/WalletInterface";
import { Signer } from "@/modules/wallet/WalletInterface";
import { Transaction } from "@biconomy/account";

export class WalletObject implements Signer {
  private pub: PublicClient;
  private sig!: Signer;

  constructor() {
    this.pub = NewPublicClient();
  }

  async create(wal: Privy.ConnectedWallet): Promise<WalletObject> {
    if (wal.connectorType === "embedded") {
      this.sig = await NewWalletEmbedded(wal);
    }

    if (wal.connectorType === "injected") {
      this.sig = await NewWalletInjected(wal);
    }

    if (wal.connectorType !== "embedded" && wal.connectorType !== "injected") {
      throw "unknown connector type";
    }

    return this;
  }

  address(): Address {
    return this.sig.address();
  }

  connectorType(): string {
    return this.sig.connectorType();
  }

  public(): PublicClient {
    return this.pub;
  }

  async sendTransaction(txn: Transaction[]): Promise<Receipt> {
    console.log("SendTransaction.txn", txn);

    const rec = await this.sig.sendTransaction(txn);

    console.log("SendTransaction.hash", rec.hash);
    console.log("SendTransaction.success", rec.success);

    return rec;
  }
}
