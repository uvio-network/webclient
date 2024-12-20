import moment from "moment";

import { Address } from "viem";
import { ChainStore } from "@/modules/chain/ChainStore";
import { EmptyPostSearchResponse } from "@/modules/api/post/search/Response";
import { EmptyUserSearchResponse } from "@/modules/api/user/search/Response";
import { EmptyVoteObject } from "@/modules/vote/VoteObject";
import { Hash } from "@/modules/wallet/WalletInterface";
import { LifecycleObject } from "@/modules/lifecycle/LifecycleObject";
import { NewSummary } from "@/modules/summary/Summary";
import { PostSearchResponse } from "@/modules/api/post/search/Response";
import { SplitList } from "@/modules/string/SplitList";
import { Summary } from "@/modules/summary/Summary";
import { UserObject } from "@/modules/user/UserObject";
import { UserSearchResponse } from "@/modules/api/user/search/Response";
import { UserStore } from "@/modules/user/UserStore";
import { VoteObject } from "@/modules/vote/VoteObject";
import { VoteSearchResponse } from "@/modules/api/vote/search/Response";

export const EmptyClaimObject = (): ClaimObject => {
  return new ClaimObject(EmptyPostSearchResponse(), EmptyUserSearchResponse(), undefined, []);
};

export class ClaimObject {
  private post: PostSearchResponse;
  private user: UserSearchResponse;
  private prnt: PostSearchResponse | undefined;
  private vote: VoteSearchResponse[];

  private claimLifecycle: LifecycleObject;
  private claimOwner: UserObject;
  private claimParent: ClaimObject | undefined;
  private claimSummary: Summary;

  constructor(post: PostSearchResponse, user: UserSearchResponse, prnt: ClaimObject | PostSearchResponse | undefined, vote: VoteSearchResponse[]) {
    {
      this.post = post;
      this.user = user;
      if (prnt instanceof ClaimObject) {
        this.prnt = prnt.getPost();
      } else if (prnt === undefined) {
        this.prnt = undefined;
      } else {
        this.prnt = prnt;
      }
      this.vote = vote;
    }

    {
      this.claimOwner = new UserObject(user);

      if (prnt instanceof ClaimObject) {
        {
          this.claimParent = prnt;
        }
      } else if (prnt === undefined) {
        {
          this.claimParent = undefined;
        }
      } else {
        {
          this.claimParent = new ClaimObject(prnt, EmptyUserSearchResponse(), undefined, []);
        }
      }

      this.claimLifecycle = new LifecycleObject(post.lifecycle, this.claimParent?.valid() || false);
      this.claimSummary = NewSummary(post, vote.map((x) => (new VoteObject(x))));
    }
  }

  //
  // getter
  //

  getPost(): PostSearchResponse {
    return this.post;
  }

  getUser(): UserSearchResponse {
    return this.user;
  }

  getPrnt(): PostSearchResponse | undefined {
    return this.prnt;
  }

  getVote(): VoteSearchResponse[] {
    return this.vote;
  }

  //
  // extern
  //

  samples(): { [key: string]: string } {
    return this.post.samples;
  }

  //
  // intern
  //

  created(): moment.Moment {
    return moment.unix(Number(this.post.created)).utc();
  }

  id(): string {
    return this.post.id;
  }

  owner(): UserObject {
    return this.claimOwner;
  }

  tree(): string {
    return this.post.tree;
  }

  //
  // public
  //

  chain(): number {
    return Number(this.post.chain);
  }

  // challenge returns whether this claim is within its own challenge window.
  // The challenge window is exactly 7 standard days long, starting from the
  // claim's expiry.
  challenge(): boolean {
    return moment().utc().isBefore(this.expiry().add(7, "days")) && this.valid();
  }

  contract(): Address {
    return this.post.contract as Address;
  }

  expired(): boolean {
    // We adjust the expired flag for every propose because of the staking
    // threshold in the smart contracts. Before the set expiry, there is a
    // moment in time when staking is not possible anymore.
    if (this.isPropose() || this.isDispute()) {
      const exp = this.expiry().unix();
      const now = moment().utc().unix();
      const end = exp - this.threshold();

      return now > end;
    }

    return moment().utc().isAfter(this.expiry());
  }

  expiry(): moment.Moment {
    return moment.unix(parseInt(this.post.expiry, 10)).utc();
  }

  hasExpiry(): boolean {
    if (this.post.expiry === undefined) {
      return false;
    }

    return this.post.expiry !== "" && this.post.expiry !== "0";
  }

  hash(): Hash {
    return {
      transaction: this.post.hash,
      userOp: "",
    };
  }

  isDispute(): boolean {
    return this.lifecycle().phase(true) === "dispute";
  }

  isPropose(): boolean {
    return this.lifecycle().phase(true) === "propose";
  }

  isResolve(): boolean {
    return this.lifecycle().phase(true) === "resolve";
  }

  isSettled(): boolean {
    return this.lifecycle().phase(true) === "settled";
  }

  kind(): string {
    return this.post.kind;
  }

  labels(): string[] {
    return SplitList(this.post.labels);
  }

  latestVote(): VoteObject {
    const vot = this.getVote();

    if (vot.length !== 0) {
      return new VoteObject(vot[vot.length - 1]);
    }

    return EmptyVoteObject();
  }

  lifecycle(): LifecycleObject {
    return this.claimLifecycle;
  }

  markdown(): string {
    let text = this.post.text;

    if (this.selected()) {
      if (this.voted()) {
        text += " And **you** have cast your vote already. Thank you for participating!";
      } else {
        text += " And **you** have been selected too. Make sure to cast your vote in time!";
      }
    }

    return text;
  }

  meta(): string[] {
    return SplitList(this.post.meta);
  }

  parent(): ClaimObject | undefined {
    return this.claimParent;
  }

  patchVote(): boolean {
    if (this.isResolve()) return false;
    if (this.pending()) return false;
    if (this.summary().post.minimum > 0) return false;

    if (this.getVote().length === 0) return true;
    if (this.getVote().length === 1 && this.pendingVote()) return true;

    return false;
  }

  pending(): boolean {
    return this.lifecycle().pending();
  }

  pendingVote(): boolean {
    return this.latestVote().pending();
  }

  precision(): number {
    const chn = ChainStore.getState().getActive();
    const pre = chn.tokens[this.token()]?.precision || 2;

    return pre;
  }

  progress(): number {
    if (this.post.expiry === "") {
      return -1;
    }

    const cre = this.created().unix();
    const exp = this.expiry().unix();
    const now = moment().utc().unix();
    const end = exp - this.threshold();

    if (now > end) {
      return 100;
    }

    const tot = end - cre;
    const ela = now - cre;
    const per = ela / tot * 100;

    return Math.ceil(per);
  }

  remaining(): moment.Moment {
    return moment.unix(this.expiry().unix() - this.threshold()).utc();
  }

  selected(): boolean {
    const use = UserStore.getState();

    if (!use.valid || !use.object) {
      return false;
    }

    if (Object.values(this.samples()).includes(use.object.id())) {
      return true;
    }

    return false;
  }

  side(): boolean {
    return this.summary().post.agreement > this.summary().post.disagreement;
  }

  summary(): Summary {
    return this.claimSummary;
  }

  threshold(): number {
    if (this.post.expiry === "") {
      return 0;
    }

    const cre = this.created().unix();
    const exp = this.expiry().unix();

    const bas = 250;              // 2.5% in basis points
    const max = 7 * 24 * 60 * 60; // 7 days in seconds
    const min = 60 * 60 * 1;      // 60 minutes in seconds

    const thr = ((exp - cre) * bas) / 10_000;

    if (thr > max) {
      return max;
    } else if (thr < min) {
      return min;
    }

    return thr;
  }

  token(): string {
    return this.post.token;
  }

  valid(): boolean {
    return this.summary().post.agreement !== this.summary().post.disagreement;
  }

  voted(): boolean {
    return this.isResolve() && this.selected() && this.summary().vote.hsitg
  }
};
