import * as Privy from "@privy-io/react-auth";

import { Address } from "viem";
import { ChainStore } from "@/modules/chain/ChainStore";
import { createBicoPaymasterClient } from "@biconomy/sdk";
import { createNexusClient } from "@biconomy/sdk";
import { custom } from "viem";
import { Hex } from "viem";
import { http } from "viem";
import { NewBundlerURL } from "@/modules/biconomy/BundlerURL";
import { NewPaymasterURL } from "@/modules/biconomy/PaymasterURL";
import { NexusClient } from "@biconomy/sdk";
import { Receipt } from "@/modules/wallet/WalletInterface";
import { Signer } from "@/modules/wallet/WalletInterface";
import { Transaction } from "@/modules/transaction/Transaction";
import { toAccount } from "viem/accounts";

export const NewWalletEmbedded = async (wal: Privy.ConnectedWallet): Promise<Signer> => {
  const active = ChainStore.getState().getActive();
  const provider = await wal.getEthereumProvider();

  const loc = toAccount({
    address: wal.address as Address,

    async signMessage({ message }) {
      return await provider.request({
        method: "personal_sign",
        params: [message, add],
      });
    },

    async signTransaction(transaction) {
      return await provider.request({
        method: "eth_signTransaction",
        params: [transaction],
      });
    },

    async signTypedData(typedData) {
      return await provider.request({
        method: "eth_signTypedData_v4",
        params: [add, JSON.stringify(typedData)],
      });
    },
  });

  const nex = await createNexusClient({
    signer: loc,
    chain: active,
    transport: custom(await wal.getEthereumProvider()),
    bundlerTransport: http(NewBundlerURL(active.id)),
    paymaster: createBicoPaymasterClient({
      paymasterUrl: NewPaymasterURL(active.id, active.biconomyPaymasterApiKey),
    })
  });

  const add = nex.account.address
  console.log("ADDRESS", add)

  return new Embedded(add, nex);
};

class Embedded implements Signer {
  private add: Address;
  private nex: NexusClient;

  constructor(add: Address, nex: NexusClient) {
    this.add = add;
    this.nex = nex;
  }

  address(): Address {
    return this.add;
  }

  connectorType(): string {
    return "embedded";
  }

  async sendTransaction(txn: Transaction[], bef: () => void, aft: () => void): Promise<Receipt> {
    bef();

    const hsh = await this.nex.sendUserOperation({
      calls: txn.map((x) => {
        return {
          to: x.to as Address,
          data: x.data as Hex,
        };
      }),
    });

    aft();

    const rec = await this.nex.waitForUserOperationReceipt({
      hash: hsh,
    });

    return {
      hash: rec.receipt.transactionHash,
      rejected: false,
      success: rec.success,
    };
  }
}
