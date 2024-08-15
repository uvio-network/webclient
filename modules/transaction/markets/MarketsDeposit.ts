import { ChainStore } from "@/modules/chain/ChainStore";
import { encodeFunctionData } from "viem";
import { parseUnits } from "viem";
import { TokenConfig } from "@/modules/token/TokenConfig";
import { Transaction } from "@biconomy/account";
import { WalletMessage } from "@/modules/wallet/WalletStore";

export const MarketsDeposit = (amo: number, tok: TokenConfig, wal: WalletMessage): Transaction => {
  const chain = ChainStore.getState().getActive();
  const markets = chain.contracts["Markets"];

  const encodedCall = encodeFunctionData({
    abi: markets.abi,
    functionName: "deposit",
    args: [
      parseUnits(String(amo), tok.decimals),
      tok.address,
      wal.contract!.address(),
    ],
  });

  return {
    to: markets.address,
    data: encodedCall,
  };
}
