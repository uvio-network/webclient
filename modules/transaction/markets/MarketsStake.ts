import { ChainStore } from "@/modules/chain/ChainStore";
import { encodeFunctionData } from "viem";
import { MarketsApprove } from "@/modules/transaction/markets/MarketsApprove";
import { MarketsDeposit } from "@/modules/transaction/markets/MarketsDeposit";
import { parseUnits } from "viem";
import { PaymasterMode } from "@biconomy/account";
import { StakeContext } from "@/modules/context/StakeContext";
import { Transaction } from "@biconomy/account";
import { WalletMessage } from "@/modules/wallet/WalletStore";

export const MarketsStake = async (ctx: StakeContext, wal: WalletMessage): Promise<StakeContext> => {
  const txn = [
    MarketsApprove(ctx.amount, ctx.token),
    MarketsDeposit(ctx.amount, ctx.token, wal),
    newStake(ctx),
  ];

  const opt = {
    paymasterServiceData: { mode: PaymasterMode.SPONSORED },
  }

  const res = await wal.contract!.contract()!.sendTransaction(txn, opt);
  const { reason, receipt, success } = await res.wait();

  console.log("MarketsStake.reason", `"${reason}"`);
  console.log("MarketsStake.transactionHash", receipt.transactionHash);
  console.log("MarketsStake.success", success);

  {
    ctx.hash = receipt.transactionHash;
  }

  return ctx;
};

const newStake = (ctx: StakeContext): Transaction => {
  const chain = ChainStore.getState().getActive();
  const markets = chain.contracts["Markets"];

  const args = [
    Number(ctx.tree), // onchain tree ID as stored in the offchain meta data
    parseUnits(String(ctx.amount), ctx.token.decimals), // amount, the amount we deposited
    ctx.option, // option, agree or disagree with the claim
  ];

  const encodedCall = encodeFunctionData({
    abi: markets.abi,
    functionName: "stake",
    args: args,
  });

  return {
    to: markets.address,
    data: encodedCall,
  };
}
