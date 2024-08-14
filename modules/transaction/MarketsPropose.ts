import { ChainStore } from "@/modules/chain/ChainStore";
import { encodeFunctionData } from "viem";
import { isAddressEqual } from "viem";
import { Log } from "viem";
import { parseEventLogs } from "viem";
import { parseUnits } from "viem";
import { PaymasterMode } from "@biconomy/account";
import { ProposeContext } from "@/modules/context/ProposeContext";
import { Transaction } from "@biconomy/account";
import { WalletMessage } from "@/modules/wallet/WalletStore";

export const MarketsPropose = async (ctx: ProposeContext, wal: WalletMessage): Promise<ProposeContext> => {
  const txn = [
    newApprove(ctx, wal),
    newDeposit(ctx, wal),
    newPropose(ctx, wal),
  ];

  const opt = {
    paymasterServiceData: { mode: PaymasterMode.SPONSORED },
  }

  const { reason, receipt, success } = await (await wal.contract!.contract()!.sendTransaction(txn, opt)).wait();

  console.log("MarketsPropose.reason", `"${reason}"`);
  console.log("MarketsPropose.transactionHash", receipt.transactionHash);
  console.log("MarketsPropose.success", success);

  {
    ctx.hash = receipt.transactionHash;
  }

  return newResponse(ctx, receipt.logs);
};

const newApprove = (ctx: ProposeContext, wal: WalletMessage): Transaction => {
  const chain = ChainStore.getState().getActive();
  const markets = chain.contracts["Markets"];

  const encodedCall = encodeFunctionData({
    abi: ctx.token.abi,
    functionName: "approve",
    args: [
      markets.address,
      parseUnits(String(ctx.amount), ctx.token.decimals),
    ],
  });

  return {
    to: ctx.token.address,
    data: encodedCall,
  };
}

const newDeposit = (ctx: ProposeContext, wal: WalletMessage): Transaction => {
  const chain = ChainStore.getState().getActive();
  const markets = chain.contracts["Markets"];

  const encodedCall = encodeFunctionData({
    abi: markets.abi,
    functionName: "deposit",
    args: [
      parseUnits(String(ctx.amount), ctx.token.decimals),
      ctx.token.address,
      wal.contract!.address(),
    ],
  });

  return {
    to: markets.address,
    data: encodedCall,
  };
}

const newPropose = (ctx: ProposeContext, wal: WalletMessage): Transaction => {
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

  const filtered = log.filter((x: any) => {
    return isAddressEqual(x.address, markets.address);
  });

  const logs: any = parseEventLogs({
    abi: markets.abi,
    eventName: "Proposed",
    logs: filtered,
  })

  {
    ctx.tree = logs[0].args.propose.marketId.toString();
    ctx.claim = logs[0].args.claimId.toString();
  }

  return ctx;
};
