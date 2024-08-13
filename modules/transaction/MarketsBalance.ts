import { ChainStore } from "@/modules/chain/ChainStore";
import { formatUnits } from "viem";
import { getContract } from "viem";
import { TokenConfig } from "@/modules/token/TokenConfig";
import { WalletMessage } from "@/modules/wallet/WalletStore";

export const MarketsBalance = async (wallet: WalletMessage, token: TokenConfig): Promise<string> => {
  const chain = ChainStore.getState().getActive();
  const markets = chain.contracts["Markets"];

  // Create an instance of the Markets contract that we want to read from.
  const con = getContract({
    abi: markets.abi,
    address: markets.address,
    client: wallet.public!,
  })

  // Read the token balance of the user's smart account.
  const [bal] = await Promise.all([
    con.read.userBalance([
      token.address,
      wallet.contract!.address(),
    ]),
  ])

  // Return a properly formatted floating point number as string.
  return parseFloat(formatUnits(BigInt(String(bal)), token.decimals)).toFixed(token.precision);
};
