import * as Config from "@/modules/config";

import { baseSepolia } from "viem/chains";
import { ChainConfig } from "@/modules/chain/ChainConfig";
import { ClaimsV040 } from "@/modules/abi/Claims.v.0.4.0";
import { ClaimsV050 } from "@/modules/abi/Claims.v.0.5.0";
import { ERC20 } from "@/modules/abi/ERC20";
import { localhost } from "viem/chains";
import { UVX } from "@/modules/abi/UVX";

export const ChainWhitelist: ChainConfig[] = [
  {
    ...localhost,
    coinbasePaymasterEndpoint: "",
    contracts: {
      "Claims-UVX": [
        { abi: ClaimsV050, address: "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0", latest: true },
      ],
    },
    rpcEndpoints: [
      "http://127.0.0.1:8545",
    ],
    tokens: {
      "UVX": { abi: UVX, address: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512", decimals: 18, precision: 2 },
    },
  },
  // https://docs.uvio.network/contracts/base-sepolia
  {
    ...baseSepolia,
    coinbasePaymasterEndpoint: Config.BaseSepoliaCoinbasePaymasterEndpoint,
    contracts: {
      "Claims-UVX": [
        { abi: ClaimsV040, address: "0x537cE8e9F4Cce5a1D8033B63f274187157a966b3", latest: false },
        { abi: ClaimsV050, address: "0x206ab72edea55819a9a90622873976A79d3419E3", latest: true },
      ],
      "Claims-WETH": [
        { abi: ClaimsV040, address: "0x057a91c0010f35F3aC937a5a47a2869d477D1937", latest: false },
        { abi: ClaimsV050, address: "0xf30593ffe830780fE969CB5Ddb1201A2F3281aE9", latest: true },
      ],
    },
    rpcEndpoints: [
      Config.BaseSepoliaAlchemyRpcEndpoint,
    ],
    tokens: {
      "UVX": { abi: UVX, address: "0x484C32b1288A88A48F8e7D20173a1048589Df182", decimals: 18, precision: 2 },
      "WETH": { abi: ERC20, address: "0x4200000000000000000000000000000000000006", decimals: 18, precision: 6 },
    },
  },
];
