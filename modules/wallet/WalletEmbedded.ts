import * as Privy from "@privy-io/react-auth";

import { Address } from "viem";
import { BiconomySmartAccountV2 } from "@biconomy/account";
import { ChainStore } from "@/modules/chain/ChainStore";
import { createSmartAccountClient } from "@biconomy/account";
import { NewBundlerURL } from "@/modules/biconomy/BundlerURL";
import { PaymasterMode } from "@biconomy/account";
import { Receipt } from "@/modules/wallet/WalletInterface";
import { Signer } from "@/modules/wallet/WalletInterface";
import { Transaction } from "@biconomy/account";

export const NewWalletEmbedded = async (wal: Privy.ConnectedWallet, index: number = 0): Promise<Signer> => {
  const chain = ChainStore.getState();
  const active = chain.getActive();

  await wal.switchChain(active.id);
  const provider = await wal.getEthersProvider();

  const con = await createSmartAccountClient({
    signer: provider.getSigner(),
    biconomyPaymasterApiKey: active.biconomyPaymasterApiKey,
    bundlerUrl: NewBundlerURL(active.id),
    rpcUrl: active.rpcEndpoints[0],
    chainId: active.id,
    index: index,
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

  async sendTransaction(txn: Transaction[]): Promise<Receipt> {
    const opt = {
      paymasterServiceData: { mode: PaymasterMode.SPONSORED },
    }

    const res = await this.con.sendTransaction(txn, opt);
    const { receipt, success } = await res.wait();

    return {
      hash: receipt.transactionHash,
      success: success.toLowerCase() === "true" ? true : false,
    };
  }
}
