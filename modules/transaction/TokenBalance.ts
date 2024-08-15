import { formatUnits } from "viem";
import { getContract } from "viem";
import { TokenConfig } from "@/modules/token/TokenConfig";
import { WalletMessage } from "@/modules/wallet/WalletStore";

export const TokenBalance = async (wallet: WalletMessage, token: TokenConfig): Promise<number> => {
  // Create an instance of the public token contract that we want to read from.
  const con = getContract({
    abi: token.abi,
    address: token.address,
    client: wallet.public!,
  });

  // Read the token balance of the user's smart account.
  const [bal] = await Promise.all([
    con.read.balanceOf([
      wallet.contract!.address(),
    ]),
  ]);

  // Return a properly formatted floating point number.
  return parseFloat(formatUnits(BigInt(String(bal)), token.decimals));
};
