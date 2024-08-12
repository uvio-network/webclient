import * as Privy from "@privy-io/react-auth";

import { AuthStore } from "@/components/auth/AuthStore";
import { BiconomySmartAccountV2 } from "@biconomy/account";
import { WalletCreate } from "@/modules/api/wallet/create/Create";
import { WalletCreateRequest } from "@/modules/api/wallet/create/Request";
import { WalletObject } from "@/modules/wallet/WalletObject";
import { WalletSearch } from "@/modules/api/wallet/search/Search";
import { WalletSearchResponse } from "../api/wallet/search/Response";
import { WalletStore } from "@/modules/wallet/WalletStore";

// TODO this should fetch wallet objects for the user or create new ones
export const EnsureWallets = async (con: BiconomySmartAccountV2, sig: Privy.ConnectedWallet, tok: string) => {
  const auth = AuthStore.getState();
  const wallet = WalletStore.getState();

  const sea = ensureWallets(con, sig, tok);

  // TODO create WalletList

  // update the wallet store
  // {
  //   WalletStore.getState().update({
  //     id: sea.id,
  //     image: sea.image,
  //     name: sea.name,
  //     token: token,
  //     valid: true,
  //   });
  // }
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
