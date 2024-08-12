import * as Privy from "@privy-io/react-auth";

import { LightSigner } from "@biconomy/account";
import { NetworkConfig } from "@/modules/chain/NetworkConfig";

export const NewWalletSigner = async (wallet: Privy.ConnectedWallet, network: NetworkConfig): Promise<LightSigner> => {
  await wallet.switchChain(network.id);
  const provider = await wallet.getEthersProvider();
  return provider.getSigner();
};
