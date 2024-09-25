import moment from "moment";

import { Address } from "viem";
import { ClaimUpside } from "@/modules/claim/ClaimUpside";
import { ClaimSummary } from "@/modules/claim/ClaimSummary";
import { EmptyUserSearchResponse } from "@/modules/api/user/search/Response";
import { NewClaimUpside } from "@/modules/claim/ClaimUpside";
import { NewClaimSummary } from "@/modules/claim/ClaimSummary";
import { PostSearchResponse } from "@/modules/api/post/search/Response";
import { SplitList } from "@/modules/string/SplitList";
import { UserObject } from "@/modules/user/UserObject";
import { UserSearchResponse } from "@/modules/api/user/search/Response";
import { UserStore } from "@/modules/user/UserStore";
import { VoteObject } from "@/modules/vote/VoteObject";
import { VoteSearchResponse } from "@/modules/api/vote/search/Response";

export class ClaimObject {
  private embd: number;
  private post: PostSearchResponse;
  private user: UserSearchResponse;
  private prnt: PostSearchResponse | undefined;
  private vote: VoteSearchResponse[];

  private claimOwner: UserObject;
  private claimParent: ClaimObject | undefined;
  private claimSummary: ClaimSummary;
  private claimUpside: ClaimUpside;

  constructor(post: PostSearchResponse, user: UserSearchResponse, prnt: ClaimObject | PostSearchResponse | undefined, vote: VoteSearchResponse[]) {
    {
      this.embd = 0;
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
        this.claimParent = prnt;
      } else if (prnt === undefined) {
        this.claimParent = undefined;
      } else {
        this.claimParent = new ClaimObject(prnt, EmptyUserSearchResponse(), undefined, []);
      }
      this.claimSummary = NewClaimSummary(post);
      this.claimUpside = NewClaimUpside(this.claimSummary, vote.map((x) => (new VoteObject(x))));
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
  // setter
  //

  setEmbd(emb: number) {
    return this.embd = emb;
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

  contract(): Address {
    return this.post.contract as Address;
  }

  embed(): number {
    return this.embd;
  }

  expired(): boolean {
    return moment().utc().isAfter(this.expiry());
  }

  expiry(): moment.Moment {
    return moment.unix(parseInt(this.post.expiry, 10)).utc();
  }

  kind(): string {
    return this.post.kind;
  }

  labels(): string[] {
    return SplitList(this.post.labels);
  }

  lifecycle(): string {
    if (this.post.lifecycle === "") {
      return "";
    }

    const spl = SplitList(this.post.lifecycle, ":");
    return spl[0].toLowerCase();
  }

  markdown(): string {
    return this.post.text;
  }

  meta(): string[] {
    return SplitList(this.post.meta);
  }

  parent(): ClaimObject | undefined {
    return this.claimParent;
  }

  pending(): boolean {
    if (this.post.lifecycle === "") {
      return false;
    }

    const spl = SplitList(this.post.lifecycle, ":");
    return spl[1].toLowerCase() === "pending";
  }

  selected(): boolean {
    const user = UserStore.getState().user;

    if (!user.valid || !user.object) {
      return false;
    }

    if (Object.values(this.samples()).includes(user.object.id())) {
      return true;
    }

    return false;
  }

  sumary(): ClaimSummary {
    return this.claimSummary;
  }

  token(): string {
    return this.post.token;
  }

  upside(): ClaimUpside {
    return this.claimUpside;
  }
}
