import * as Config from "@/modules/config";

import { baseSepolia } from "viem/chains";
import { ChainConfig } from "@/modules/chain/ChainConfig";
import { ERC20 } from "@/modules/abi/ERC20";
import { Claims } from "@/modules/abi/Claims";

export const ChainWhitelist: ChainConfig[] = [
  {
    ...baseSepolia,
    biconomyPaymasterApiKey: Config.BaseSepoliaBiconomyPaymasterApiKey,
    contracts: {
      "Claims-UVX": { abi: Claims, address: "0x48455E0c620D46239BE9358C9B2Bd6D0bf1F3AA6" },
      "Claims-WETH": { abi: Claims, address: "0x6Ed3CD11d2DeBbc08a2d36D1da57eBF3dFA02a8D" },
    },
    rpcEndpoints: [
      Config.BaseSepoliaAlchemyRpcEndpoint,
    ],
    tokens: {
      "UVX": { abi: ERC20, address: "0x04Ec0582e2700Db583e3BCb9b913D181Ac2D68A8", decimals: 18, precision: 2 },
      "WETH": { abi: ERC20, address: "0x4200000000000000000000000000000000000006", decimals: 18, precision: 6 },
    },
  },
];
