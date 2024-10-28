import * as Privy from "@privy-io/react-auth";

import { Address, Hex } from "viem";
import { ChainStore } from "@/modules/chain/ChainStore";
import { BundlerClient, createBundlerClient, toCoinbaseSmartAccount } from "viem/account-abstraction";
import { createWalletClient } from "viem";
import { custom } from "viem";
import { http } from "viem";
import { NewPublicClient } from "@/modules/chain/PublicClient";
import { parseGwei } from "viem";
import { PublicClient } from "viem";
import { Receipt } from "@/modules/wallet/WalletInterface";
import { Signer } from "@/modules/wallet/WalletInterface";
import { Transaction } from "@/modules/transaction/TransactionInterface";
import { toAccount } from "viem/accounts";

export const NewWalletEmbedded = async (wal: Privy.ConnectedWallet, index: number = 0): Promise<Signer> => {
  const active = ChainStore.getState().getActive();
  const provider = await wal.getEthereumProvider();

  const add = wal.address as Address;

  const cli = createWalletClient({
    chain: active,
    transport: custom(provider),
  });

  const loc = toAccount({
    address: add,

    // Use wallet client to sign a message
    async signMessage({ message }) {
      return await provider.request({
        method: 'personal_sign',
        params: [message, add],
      });
    },

    // Use wallet client to sign a transaction
    async signTransaction(transaction) {
      return await provider.request({
        method: 'eth_signTransaction',
        params: [transaction],
      });
    },

    // Use wallet client to sign typed data
    async signTypedData(typedData) {
      return await provider.request({
        method: 'eth_signTypedData_v4',
        params: [add, JSON.stringify(typedData)],
      });
    },
  });

  const acc = await toCoinbaseSmartAccount({
    client: cli,
    owners: [loc],
  })

  const bun = createBundlerClient({
    account: acc,
    client: cli,
    transport: http(active.coinbasePaymasterEndpoint),
    chain: active,
  });

  return new Embedded(bun.account.address, bun, NewPublicClient());
};

class Embedded implements Signer {
  private add: Address;
  private bun: BundlerClient;

  constructor(add: Address, bun: BundlerClient, pub: PublicClient) {
    this.add = add;
    this.bun = bun;

    this.bun.userOperation = {
      async estimateFeesPerGas(parameters) {
        const estimatedFees = await pub.estimateFeesPerGas();
        return {
          ...estimatedFees,
          maxFeePerGas: BigInt(
            Math.round(Number(estimatedFees.maxFeePerGas) * 1.12)
          ),
          maxPriorityFeePerGas: BigInt(
            Math.round(Number(estimatedFees.maxPriorityFeePerGas) * 1.12)
          ),
        };
      },
    };
  }

  address(): Address {
    return this.add;
  }

  connectorType(): string {
    return "embedded";
  }

  async sendTransaction(txn: Transaction[], bef: () => void, aft: () => void): Promise<Receipt> {
    {
      bef();
    }

    const hsh = await this.bun.sendUserOperation({
      calls: txn.map((x) => {
        return {
          to: x.to as Address,
          data: x.data as Hex,
        };
      }),
      maxFeePerGas: parseGwei("6"),
      maxPriorityFeePerGas: parseGwei("0.5"),
      paymaster: true,
    });

    {
      aft();
    }

    const { receipt, success } = await this.bun.waitForUserOperationReceipt({
      hash: hsh,
    });

    return {
      hash: receipt.transactionHash,
      rejected: false,
      success: success,
    };
  }
}
