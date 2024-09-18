import { WalletCreate } from "@/modules/api/wallet/create/Create";
import { WalletCreateRequest } from "@/modules/api/wallet/create/Request";
import { WalletObject } from "@/modules/wallet/WalletObject";
import { WalletSearch } from "@/modules/api/wallet/search/Search";
import { WalletSearchResponse } from "@/modules/api/wallet/search/Response";
import { WalletStore } from "@/modules/wallet/WalletStore";

export const EnsureWallets = async (wal: WalletObject, tok: string) => {
  await ensureWallets(wal, tok);

  WalletStore.getState().update({
    object: wal,
    ready: true,
  });
};

export const ensureWallets = async (wal: WalletObject, tok: string) => {
  const sea = await WalletSearch(tok, [{ owner: "self" }]);

  const req: WalletCreateRequest[] = [];

  if (!existsWallet(wal.address(), wal.connectorType(), sea)) {
    req.push(createWallet(wal.address(), wal.connectorType()));
  }

  if (req.length !== 0) {
    await WalletCreate(tok, req);
  }
};

const createWallet = (add: string, kin: string): WalletCreateRequest => {
  return {
    address: add,
    description: kin === "embedded" ? "embedded smart account" : "injected EOA",
    kind: kin,
  };
};

const existsWallet = (add: string, kin: string, res: WalletSearchResponse[]): boolean => {
  return res.some((x) => x.address === add && x.kind === kin);
};
