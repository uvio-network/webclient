import { ChainStore } from "@/modules/chain/ChainStore";
import { encodeFunctionData, TransactionReceipt } from "viem";
import { isAddressEqual } from "viem";
import { Log } from "viem";
import { parseEventLogs } from "viem";
import { parseUnits } from "viem";
import { PaymasterMode } from "@biconomy/account";
import { TokenConfig } from "@/modules/token/TokenConfig";
import { Transaction } from "@biconomy/account";
import { WalletMessage } from "@/modules/wallet/WalletStore";

export const MarketsPropose = async (wallet: WalletMessage, input: { expiry: number, amount: number, token: TokenConfig }): Promise<{ tree: string, claim: string }> => {

  const txn = [
    newApprove(wallet, input),
    newDeposit(wallet, input),
    newPropose(wallet, input),
  ];

  const opt = {
    paymasterServiceData: { mode: PaymasterMode.SPONSORED },
  }

  const { reason, receipt, success } = await (await wallet.contract!.contract()!.sendTransaction(txn, opt)).wait();

  console.log("MarketsPropose.reason", `"${reason}"`);
  console.log("MarketsPropose.transactionHash", receipt.transactionHash);
  console.log("MarketsPropose.success", success);

  return newResponse(receipt.logs);
};

const newApprove = (wallet: WalletMessage, input: { expiry: number, amount: number, token: TokenConfig }): Transaction => {
  const chain = ChainStore.getState().getActive();
  const markets = chain.contracts["Markets"];

  const encodedCall = encodeFunctionData({
    abi: input.token.abi,
    functionName: "approve",
    args: [
      markets.address,
      parseUnits(String(input.amount), input.token.decimals),
    ],
  });

  return {
    to: input.token.address,
    data: encodedCall,
  };
}

const newDeposit = (wallet: WalletMessage, input: { expiry: number, amount: number, token: TokenConfig }): Transaction => {
  const chain = ChainStore.getState().getActive();
  const markets = chain.contracts["Markets"];

  const encodedCall = encodeFunctionData({
    abi: markets.abi,
    functionName: "deposit",
    args: [
      parseUnits(String(input.amount), input.token.decimals),
      input.token.address,
      wallet.contract!.address(),
    ],
  });

  return {
    to: markets.address,
    data: encodedCall,
  };
}

const newPropose = (wallet: WalletMessage, input: { expiry: number, amount: number, token: TokenConfig }): Transaction => {
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
        parseUnits(String(input.amount), input.token.decimals), // amount, the amount we deposited
        input.token.address, // asset, the token selected by the user
        input.expiry, // expiry, unix timestamp in seconds
        input.expiry, // expiry, unix timestamp in seconds
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

const newResponse = (log: Log[]): { tree: string, claim: string } => {
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

  return {
    tree: logs[0].args.propose.marketId.toString(),
    claim: logs[0].args.claimId.toString(),
  };
};
