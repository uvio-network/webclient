import * as Privy from "@privy-io/react-auth";

import { ChainConfig } from "@/modules/chain/ChainConfig";
import { LightSigner } from "@biconomy/account";

export const NewWalletSigner = async (wallet: Privy.ConnectedWallet, chain: ChainConfig): Promise<LightSigner> => {
  await wallet.switchChain(chain.id);
  const provider = await wallet.getEthersProvider();
  return provider.getSigner();
};
