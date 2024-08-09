import * as Config from "@/modules/config";

import { arbitrumSepolia } from "viem/chains";
import { NetworkConfig } from "@/modules/chain/NetworkConfig";

export const ChainConfig: NetworkConfig[] = [
  {
    ...arbitrumSepolia,
    biconomyPaymasterApiKey: Config.ArbitrumSepoliaBiconomyPaymasterApiKey,
    rpcEndpoints: [Config.ArbitrumSepoliaAlchemyRpcEndpoint],
  },
];
