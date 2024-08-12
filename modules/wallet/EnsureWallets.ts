import * as Privy from "@privy-io/react-auth";

import { BiconomySmartAccountV2 } from "@biconomy/account";
import { NewPublicClient } from "@/modules/chain/PublicClient";
import { UserStore } from "@/modules/user/UserStore";
import { WalletCreate } from "@/modules/api/wallet/create/Create";
import { WalletCreateRequest } from "@/modules/api/wallet/create/Request";
import { WalletObject } from "@/modules/wallet/WalletObject";
import { WalletSearch } from "@/modules/api/wallet/search/Search";
import { WalletSearchResponse } from "@/modules/api/wallet/search/Response";
import { WalletStore } from "@/modules/wallet/WalletStore";

export const EnsureWallets = async (con: BiconomySmartAccountV2, sig: Privy.ConnectedWallet, tok: string) => {
  const user = UserStore.getState().user;
  const wallet = WalletStore.getState();

  const sea = await ensureWallets(con, sig, tok);

  wallet.update({
    contract: new WalletObject(searchWallet("contract", sea)!, con, undefined, user.object!),
    public: NewPublicClient(),
    ready: true,
    signer: new WalletObject(searchWallet("signer", sea)!, undefined, sig, user.object!),
  });
};

export const ensureWallets = async (con: BiconomySmartAccountV2, sig: Privy.ConnectedWallet, tok: string): Promise<WalletSearchResponse[]> => {
  const sea = await WalletSearch(tok, [{ owner: "self" }]);

  const req: WalletCreateRequest[] = [];

  {
    const add = await con.getAddress();
    if (!existsWallet(add, "contract", sea)) {
      req.push(createWallet(add, "contract", "biconomy", "default smart account"));
    }
  }

  {
    const add = sig.address;
    if (!existsWallet(add, "signer", sea)) {
      req.push(createWallet(add, "signer", "privy", "default signer wallet"));
    }
  }

  if (req.length !== 0) {
    await WalletCreate(tok, req);
    return await WalletSearch(tok, [{ owner: "self" }]);
  }

  return sea;
};

const createWallet = (add: string, kin: string, pro: string, des: string): WalletCreateRequest => {
  return {
    active: "true",
    address: add,
    description: des,
    kind: kin,
    provider: pro,
  };
};

const existsWallet = (add: string, kin: string, res: WalletSearchResponse[]): boolean => {
  return res.some((x) => x.address === add && x.kind === kin);
};

const searchWallet = (kin: string, res: WalletSearchResponse[]): WalletSearchResponse | undefined => {
  return res.find((x) => x.active === "true" && x.kind === kin);
};
