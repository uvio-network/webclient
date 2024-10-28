import * as Privy from "@privy-io/react-auth";

import { Address, Hex } from "viem";
import { BiconomySmartAccountV2 } from "@biconomy/account";
import { ChainStore } from "@/modules/chain/ChainStore";
import { createSmartAccountClient } from "@biconomy/account";
import { EmptyReceipt } from "@/modules/wallet/WalletInterface";
import { NewBundlerURL } from "@/modules/biconomy/BundlerURL";
import { PaymasterMode } from "@biconomy/account";
import { Receipt } from "@/modules/wallet/WalletInterface";
import { Signer } from "@/modules/wallet/WalletInterface";
import { Transaction } from "@/modules/transaction/Transaction";

export const NewWalletEmbedded = async (wal: Privy.ConnectedWallet, index: number = 0): Promise<Signer> => {
  const active = ChainStore.getState().getActive();

  await wal.switchChain(active.id);
  const provider = await wal.getEthersProvider();

  const con = await createSmartAccountClient({
    biconomyPaymasterApiKey: active.biconomyPaymasterApiKey,
    bundlerUrl: NewBundlerURL(active.id),
    chainId: active.id,
    index: index,
    rpcUrl: active.rpcEndpoints[0],
    signer: provider.getSigner(),
  });

  const add = await con.getAddress();

  return new Embedded(add, con);
};

class Embedded implements Signer {
  private add: Address;
  private con: BiconomySmartAccountV2;

  constructor(add: Address, con: BiconomySmartAccountV2) {
    this.add = add;
    this.con = con;
  }

  address(): Address {
    return this.add;
  }

  connectorType(): string {
    return "embedded";
  }

  async getUserOpReceipt(hsh: string): Promise<string> {
    if (this.con.bundler) {
      const rec = await this.con.bundler.getUserOpReceipt(hsh);
      return rec.receipt?.transactionHash as string | "";
    }

    return "";
  }

  async sendTransaction(txn: Transaction[], bef: () => void, aft: () => void): Promise<Receipt> {
    const rec = EmptyReceipt();

    try {
      {
        bef();
      }

      const { userOpHash, wait } = await this.con.sendTransaction(txn, {
        paymasterServiceData: { mode: PaymasterMode.SPONSORED },
      });

      {
        aft();
      }

      {
        rec.hash.userOp = userOpHash;
      }

      const { receipt, success } = await wait();

      {
        rec.hash.transaction = receipt.transactionHash;
        rec.success = success.toLowerCase() === "true" ? true : false;
      }
    } catch (err) {
      //
    }

    return rec;
  }
}
