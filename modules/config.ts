export const ApiServerRPCEndpoint: string = process.env.NEXT_PUBLIC_APISERVER_RPC_ENDPOINT || "http://127.0.0.1:7777"
export const ApiServerRPCSendJSON: boolean = (String(process.env.NEXT_PUBLIC_APISERVER_RPC_SENDJSON).toLowerCase() === "true") || true
export const PrivyAppID: string = process.env.NEXT_PUBLIC_PRIVY_APP_ID || "clz1hy6f302wbx56o75ry96nm"
export const PrivyClientID: string = process.env.NEXT_PUBLIC_PRIVY_CLIENT_ID || "client-WY2onuhfaV4hp8h313qp56xF4BiY6tF3bh9idyWCASLct"
