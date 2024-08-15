import { ChainStore } from "@/modules/chain/ChainStore";
import { Address, encodeFunctionData } from "viem";
import { isAddressEqual } from "viem";
import { Log } from "viem";
import { parseEventLogs } from "viem";
import { parseUnits } from "viem";
import { PaymasterMode } from "@biconomy/account";
import { StakeContext } from "@/modules/context/StakeContext";
import { Transaction } from "@biconomy/account";
import { WalletMessage } from "@/modules/wallet/WalletStore";
import { EmptyVoteCreateResponse } from "../api/vote/create/Response";

export const MarketsStake = async (ctx: StakeContext, wal: WalletMessage): Promise<StakeContext> => {
  return ctx;
};
