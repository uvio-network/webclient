import moment from "moment";

import * as Privy from "@privy-io/react-auth";

import { BiconomySmartAccountV2 } from "@biconomy/account";
import { ChainStore } from "@/modules/chain/ChainStore";
import { UserObject } from "@/modules/user/UserObject";
import { WalletSearchResponse } from "@/modules/api/wallet/search/Response";
import { WalletStore } from "@/modules/wallet/WalletStore";
import { NewWalletContract } from "./WalletContract";

export class WalletObject {
  private wallet: WalletSearchResponse;

  private walletContract: BiconomySmartAccountV2 | undefined;
  private walletSigner: Privy.ConnectedWallet | undefined;
  private walletOwner: UserObject;

  constructor(wal: WalletSearchResponse, con: BiconomySmartAccountV2 | undefined, sig: Privy.ConnectedWallet | undefined, use: UserObject) {
    {
      this.wallet = wal;
    }

    {
      this.walletContract = con;
      this.walletSigner = sig;
      this.walletOwner = use;
    }
  }

  //
  // getter
  //

  getWallet(): WalletSearchResponse {
    return this.wallet;
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

  address(): string {
    return this.wallet.address;
  }

  // contract returns a smart account instance as controlled by the configured
  // signer. This smart account is the smart contract wallet representing the
  // user onchain.
  contract(): BiconomySmartAccountV2 | undefined {
    if (this.kind() === "contract") {
      return this.walletContract;
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
      return this.walletSigner;
    }

    return undefined;
  }

  //
  // symbol
  //

  // refresh must be called when the user selects another chain. If refresh is
  // not called upon a chain switch, then the underlying wallets will not
  // reflect the user's preference of a chain switch.
  async refresh() {
    const chain = ChainStore.getState();
    const wallet = WalletStore.getState().wallet;

    const active = chain.getActive();
    const signer = wallet.signer?.signer();

    if (this.walletContract && signer) {
      this.walletContract = await NewWalletContract(signer);
    }

    if (this.walletSigner) {
      this.walletSigner.switchChain(active.id);
    }
  }
}
