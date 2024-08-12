import * as Privy from "@privy-io/react-auth";

import { BiconomySmartAccountV2 } from "@biconomy/account";
import { ChainStore } from "@/modules/chain/ChainStore";
import { createSmartAccountClient } from "@biconomy/account";
import { NewBundlerURL } from "@/modules/biconomy/BundlerURL";
import { NewWalletSigner } from "@/modules/wallet/WalletSigner";

export const NewWalletContract = async (signer: Privy.ConnectedWallet, index: number = 0): Promise<BiconomySmartAccountV2> => {
  const chain = ChainStore.getState();
  const active = chain.getActive();

  return await createSmartAccountClient({
    signer: await NewWalletSigner(signer, active),
    biconomyPaymasterApiKey: active.biconomyPaymasterApiKey,
    bundlerUrl: NewBundlerURL(active.id),
    rpcUrl: active.rpcEndpoints[0],
    chainId: active.id,
    index: index,
  });
};
