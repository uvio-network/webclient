import moment from "moment";

import * as Privy from "@privy-io/react-auth";

import { BiconomySmartAccountV2 } from "@biconomy/account";
import { UserObject } from "@/modules/user/UserObject";
import { UserSearchResponse } from "@/modules/api/user/search/Response";
import { WalletSearchResponse } from "@/modules/api/wallet/search/Response";

export class WalletObject {
  private user: UserSearchResponse;
  private wallet: WalletSearchResponse;

  private walletOwner: UserObject;

  constructor(wallet: WalletSearchResponse, user: UserSearchResponse) {
    {
      this.user = user;
      this.wallet = wallet;
    }

    {
      this.walletOwner = new UserObject(user);
    }
  }

  //
  // getter
  //

  getWallet(): WalletSearchResponse {
    return this.wallet;
  }

  getUser(): UserSearchResponse {
    return this.user;
  }

  //
  // intern
  //

  created(): moment.Moment {
    return moment.unix(Number(this.wallet.created)).utc();
  }

  id(): string {
    return this.wallet.id;
  }

  owner(): UserObject {
    return this.walletOwner;
  }

  //
  // public
  //

  active(): boolean {
    return this.wallet.active.toLowerCase() === "true";
  }

  // contract returns a smart account instance as controlled by the configured
  // signer. This smart account is the smart contract wallet representing the
  // user onchain.
  contract(): BiconomySmartAccountV2 | undefined {
    if (this.kind() === "contract") {
      return undefined; // TODO
    }

    return undefined;
  }

  description(): string {
    return this.wallet.description;
  }

  kind(): string {
    return this.wallet.kind;
  }

  provider(): string {
    return this.wallet.provider;
  }

  // signer is any wallet that the user has connected in order to control the
  // smart account. This signer is a Privy embedded wallet by default without
  // signature confirmation. The signer can also be any other wallet like Rabby,
  // or by extension a Trezor.
  signer(): Privy.ConnectedWallet | undefined {
    if (this.kind() === "signer") {
      return undefined; // TODO
    }

    return undefined;
  }
}
