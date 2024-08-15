import { ChainStore } from "@/modules/chain/ChainStore";
import { encodeFunctionData } from "viem";
import { Log } from "viem";
import { MarketsApprove } from "@/modules/transaction/markets/MarketsApprove";
import { MarketsDeposit } from "@/modules/transaction/markets/MarketsDeposit";
import { parseEventLogs } from "viem";
import { parseUnits } from "viem";
import { PaymasterMode } from "@biconomy/account";
import { ProposeContext } from "@/modules/context/ProposeContext";
import { Transaction } from "@biconomy/account";
import { WalletMessage } from "@/modules/wallet/WalletStore";

export const MarketsPropose = async (ctx: ProposeContext, wal: WalletMessage): Promise<ProposeContext> => {
  const txn = [
    MarketsApprove(ctx.amount, ctx.token),
    MarketsDeposit(ctx.amount, ctx.token, wal),
    newPropose(ctx),
  ];

  const opt = {
    paymasterServiceData: { mode: PaymasterMode.SPONSORED },
  }

  const res = await wal.contract!.contract()!.sendTransaction(txn, opt);
  const { reason, receipt, success } = await res.wait();

  console.log("MarketsPropose.reason", `"${reason}"`);
  console.log("MarketsPropose.transactionHash", receipt.transactionHash);
  console.log("MarketsPropose.success", success);

  {
    ctx.hash = receipt.transactionHash;
  }

  return newResponse(ctx, receipt.logs);
};

const newPropose = (ctx: ProposeContext): Transaction => {
  const chain = ChainStore.getState().getActive();
  const markets = chain.contracts["Markets"];

  const encodedCall = encodeFunctionData({
    abi: markets.abi,
    functionName: "propose",
    args: [
      [
        "", // metadataURI, we have none right now
        0, // treeId, we get the new tree ID in teh response
        0, // nullifyMarketId, we are not nullifying here
        parseUnits(String(ctx.amount), ctx.token.decimals), // amount, the amount we deposited
        ctx.token.address, // asset, the token selected by the user
        ctx.expiry, // expiry, unix timestamp in seconds
        ctx.expiry, // expiry, unix timestamp in seconds
        true, // option, agree or disagree with the claim
        false, // dispute, we are not disputing here
        [0, 0], // no time weighted staking share
      ],
    ],
  });

  return {
    to: markets.address,
    data: encodedCall,
  };
}

const newResponse = (ctx: ProposeContext, log: Log[]): ProposeContext => {
  const chain = ChainStore.getState().getActive();
  const markets = chain.contracts["Markets"];

  const logs: any = parseEventLogs({
    abi: markets.abi,
    eventName: "Proposed",
    logs: log,
  })

  {
    ctx.tree = logs[0].args.propose.marketId.toString();
    ctx.claim = logs[0].args.claimId.toString();
  }

  return ctx;
};
