// NewPaymasterURL returns the formatted paymaster URL for the Biconomy
// provider.
//
//     inp[0] the chain ID where the paymaster is being used
//     inp[1] the Biconomy API key for the environment being used
//     out[1] the formatted paymaster URL for the Biconomy provider
//
export const NewPaymasterURL = (cid: number, key: string): string => {
  return `https://paymaster.biconomy.io/api/v1/${cid}/${key}`;
};
