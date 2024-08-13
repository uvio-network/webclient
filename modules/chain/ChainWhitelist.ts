import * as Config from "@/modules/config";

import { arbitrumSepolia } from "viem/chains";
import { ChainConfig } from "@/modules/chain/ChainConfig";
import { ERC20 } from "@/modules/abi/ERC20";
import { Markets } from "@/modules/abi/Markets";

export const ChainWhitelist: ChainConfig[] = [
  {
    ...arbitrumSepolia,
    biconomyPaymasterApiKey: Config.ArbitrumSepoliaBiconomyPaymasterApiKey,
    contracts: {
      "Markets": { abi: Markets, address: "0xBa230f4Bf34E48D04e65dE9a0F6Fe5EcDAa0c17A" },
    },
    rpcEndpoints: [
      Config.ArbitrumSepoliaAlchemyRpcEndpoint,
    ],
    tokens: {
      "UVX": { abi: ERC20, address: "0x626D4ec870Bf00D03718E5F3b98D7C0b249D5883", decimals: 18, precision: 2 },
      "WETH": { abi: ERC20, address: "0x980B62Da83eFf3D4576C647993b0c1D7faf17c73", decimals: 18, precision: 6 },
    },
  },
];
