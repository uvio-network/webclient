import { ContractConfig } from "@/modules/contract/ContractConfig";
import { formatUnits } from "viem";
import { TokenConfig } from "@/modules/token/TokenConfig";
import { WalletMessage } from "@/modules/wallet/WalletStore";

export const SearchBalance = async (wal: WalletMessage, cla: ContractConfig, tok: TokenConfig): Promise<{ alo: number, avl: number }> => {
  const res = await wal.public!.readContract({
    address: cla.address,
    abi: cla.abi,
    functionName: "searchBalance",
    args: [
      wal.contract!.address(),
    ],
  }) as unknown as [bigint, bigint];

  return {
    alo: parseFloat(formatUnits(res[0], tok.decimals)),
    avl: parseFloat(formatUnits(res[1], tok.decimals)),
  };
};