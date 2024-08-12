export const ApiServerRpcEndpoint: string = process.env.NEXT_PUBLIC_APISERVER_RPC_ENDPOINT || "http://127.0.0.1:7777"
export const ApiServerRpcSendJSON: boolean = (process.env.NEXT_PUBLIC_APISERVER_RPC_SENDJSON || "").toLowerCase() === "true" || true

export const ArbitrumSepoliaAlchemyRpcEndpoint: string = process.env.NEXT_PUBLIC_ARBITRUM_SEPOLIA_ALCHEMY_RPC_ENDPOINT || ""
export const ArbitrumSepoliaBiconomyPaymasterApiKey: string = process.env.NEXT_PUBLIC_ARBITRUM_SEPOLIA_BICONOMY_PAYMASTER_API_KEY || ""
export const ArbitrumSepoliaUvioMarketsContract: string = process.env.NEXT_PUBLIC_ARBITRUM_SEPOLIA_UVIO_MARKETS_CONTRACT || ""

export const DefaultChainId: number = Number(process.env.NEXT_PUBLIC_DEFAULT_CHAIN_ID) || 0

export const PrivyAppId: string = process.env.NEXT_PUBLIC_PRIVY_APP_ID || "clz1hy6f302wbx56o75ry96nm"
export const PrivyClientId: string = process.env.NEXT_PUBLIC_PRIVY_CLIENT_ID || "client-WY2onuhfaV4hp8h313qp56xF4BiY6tF3bh9idyWCASLct"
