export const ApiServerRPCEndpoint: string = process.env.NEXT_PUBLIC_APISERVER_RPC_ENDPOINT || "http://127.0.0.1:7777"
export const ApiServerRPCSendJSON: boolean = (String(process.env.NEXT_PUBLIC_APISERVER_RPC_SENDJSON).toLowerCase() === "true") || true
export const PrivyAppID: string = process.env.NEXT_PUBLIC_PRIVY_APP_ID || ""
export const PrivyClientID: string = process.env.NEXT_PUBLIC_PRIVY_CLIENT_ID || ""
