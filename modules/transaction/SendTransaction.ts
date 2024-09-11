import { PaymasterMode } from "@biconomy/account";
import { Transaction } from "@biconomy/account";
import { WalletMessage } from "@/modules/wallet/WalletStore";

export const SendTransaction = async (wal: WalletMessage, txn: Transaction[]): Promise<{ hash: string, success: boolean }> => {
  const opt = {
    paymasterServiceData: { mode: PaymasterMode.SPONSORED },
  }

  console.log("SendTransaction.txn", txn);

  const res = await wal.contract!.contract()!.sendTransaction(txn, opt);
  const { receipt, success } = await res.wait();

  console.log("SendTransaction.transactionHash", receipt.transactionHash);
  console.log("SendTransaction.success", success);

  return {
    hash: receipt.transactionHash,
    success: success.toLowerCase() === "true" ? true : false,
  };
};
