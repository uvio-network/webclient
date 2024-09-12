# webclient

This is the official webclient for the Uvio platform. The communication between
[webclient] and [apiserver] is managed using the auto generated [apitscode]
library.



### development

```
npm install https://github.com/uvio-network/apitscode.git#v0.1.0
```

Run the webclient locally together with the [apiserver] and you are good to go.

```
npm run dev
```



### configuration

In order to use the frontend properly you need to setup your own `.env.local`
with the following configuration.

```
NEXT_PUBLIC_BASE_SEPOLIA_ALCHEMY_RPC_ENDPOINT=
NEXT_PUBLIC_BASE_SEPOLIA_BICONOMY_PAYMASTER_API_KEY=

NEXT_PUBLIC_DEFAULT_CHAIN_ID=

NEXT_PUBLIC_PRIVY_APP_ID=
NEXT_PUBLIC_PRIVY_CLIENT_ID=
```



[apiserver]: https://github.com/uvio-network/apiserver
[apitscode]: https://github.com/uvio-network/apitscode
[webclient]: https://github.com/uvio-network/webclient
