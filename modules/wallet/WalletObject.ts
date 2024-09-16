import * as Privy from "@privy-io/react-auth";

import { Address } from "viem";
import { NewPublicClient } from "@/modules/chain/PublicClient";
import { PublicClient } from "viem";
import { Receipt } from "@/modules/wallet/WalletInterface";
import { Signer } from "@/modules/wallet/WalletInterface";
import { Transaction } from "@biconomy/account";
import { NewWalletEmbedded } from "./WalletEmbedded";
import { NewWalletInjected } from "./WalletInjected";

export class WalletObject implements Signer {
  private pub: PublicClient;
  private sig!: Signer;

  constructor() {
    this.pub = NewPublicClient();
  }

  async create(wal: Privy.ConnectedWallet): Promise<WalletObject> {
    switch (wal.connectorType) {
      case "embedded":
        {
          this.sig = await NewWalletEmbedded(wal);
        }

        {
          break;
        }
      case "injected":

        {
          this.sig = await NewWalletInjected(wal);
        }

        {
          break;
        }
      default:
        {
          throw "unknown connector type";
        }
    }

    return this;
  }

  address(): Address {
    return this.sig.address();
  }

  connectorType(): string {
    return this.connectorType();
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
