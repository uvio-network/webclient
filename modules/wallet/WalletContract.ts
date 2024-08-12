import * as Privy from "@privy-io/react-auth";

import { createSmartAccountClient } from "@biconomy/account";
import { NetworkConfig } from "@/modules/chain/NetworkConfig";
import { NewBundlerURL } from "@/modules/biconomy/BundlerURL";
import { NewWalletSigner } from "@/modules/wallet/WalletSigner";
import { WalletStore } from "@/modules/wallet/WalletStore";

export const NewWalletContract = async (wallet: Privy.ConnectedWallet, network: NetworkConfig, index: number = 0) => {
  const contract = await createSmartAccountClient({
    signer: await NewWalletSigner(wallet, network),
    biconomyPaymasterApiKey: network.biconomyPaymasterApiKey,
    bundlerUrl: NewBundlerURL(String(network.id)),
    rpcUrl: network.rpcEndpoints[0],
    chainId: network.id,
    index: index,
  });

  WalletStore.getState().update({
    address: await contract.getAccountAddress(),
    contract: contract,
    index: index,
    signer: wallet.address,
  });
};
