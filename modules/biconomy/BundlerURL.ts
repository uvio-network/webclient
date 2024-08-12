// NewBundlerURL returns the formatted bundler URL for the Biconomy provider.
// Note that at the moment the bundler's API key is globally provided by
// Biconomy.
//
//     inp[0] the chain ID where the bundler is being used
//     inp[1] the Biconomy API key for the environment being used
//     out[1] the formatted bundler URL for the Biconomy provider
//
export const NewBundlerURL = (cid: string, key: string = "nJPK7B3ru.dd7f7861-190d-41bd-af80-6877f74b8f44"): string => {
  return `https://bundler.biconomy.io/api/v2/${cid}/${key}`;
};
