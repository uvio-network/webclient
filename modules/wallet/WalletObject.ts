import * as Privy from "@privy-io/react-auth";

import { Address } from "viem";
import { NewPublicClient } from "@/modules/chain/PublicClient";
import { NewWalletEmbedded } from "@/modules/wallet/WalletEmbedded";
import { NewWalletInjected } from "@/modules/wallet/WalletInjected";
import { PublicClient } from "viem";
import { Receipt } from "@/modules/wallet/WalletInterface";
import { Signer } from "@/modules/wallet/WalletInterface";
import { Transaction } from "@/modules/transaction/Transaction";
import { zeroAddress } from "viem";

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
      throw `Your wallet could not be connected because of the invalid connector type "${wal.connectorType}".`;
    }

    return this;
  }

  address(): Address {
    if (this.sig) {
      return this.sig.address();
    }

    return zeroAddress;
  }

  connectorType(): string {
    if (this.sig) {
      return this.sig.connectorType();
    }

    return "";
  }

  public(): PublicClient {
    return this.pub;
  }

  async getUserOpReceipt(hsh: string): Promise<string> {
    return await this.sig.getUserOpReceipt(hsh);
  }

  async sendTransaction(txn: Transaction[], bef: () => void, aft: () => void): Promise<Receipt> {
    try {
      const rec = await this.sig.sendTransaction(txn, bef, aft);

      {
        console.log("SendTransaction.input", txn);
      }

      if (rec.hash.userOp) {
        console.log("SendTransaction.userOp", rec.hash.userOp);
      }

      {
        console.log("SendTransaction.transaction", rec.hash.transaction);
        console.log("SendTransaction.success", rec.success);
      }

      return rec;
    } catch (err: any) {
      return Promise.reject(err);
    }
  }
}
