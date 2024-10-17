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

  async sendTransaction(txn: Transaction[], bef: () => void, aft: () => void): Promise<Receipt> {
    const opt = {
      paymasterServiceData: { mode: PaymasterMode.SPONSORED },
    }

    bef();

    const res = await this.con.sendTransaction(txn, opt);

    aft();

    const { receipt, success } = await res.wait();

    return {
      hash: receipt.transactionHash,
      rejected: false,
      success: success.toLowerCase() === "true" ? true : false,
    };
  }
}
