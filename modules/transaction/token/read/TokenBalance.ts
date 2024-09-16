import { formatUnits } from "viem";
import { TokenConfig } from "@/modules/token/TokenConfig";
import { WalletMessage } from "@/modules/wallet/WalletStore";

export const TokenBalance = async (wal: WalletMessage, tok: TokenConfig): Promise<number> => {
  const res = await wal.object.public().readContract({
    address: tok.address,
    abi: tok.abi,
    functionName: "balanceOf",
    args: [wal.object.address()],
  }) as unknown as bigint;

  return parseFloat(formatUnits(res, tok.decimals));
};
