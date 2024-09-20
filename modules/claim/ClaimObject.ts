import moment from "moment";

import { Address } from "viem";
import { ClaimUpside } from "@/modules/claim/ClaimUpside";
import { ClaimVotes } from "@/modules/claim/ClaimVotes";
import { EmptyUserSearchResponse } from "@/modules/api/user/search/Response";
import { NewClaimUpside } from "@/modules/claim/ClaimUpside";
import { NewClaimVotes } from "@/modules/claim/ClaimVotes";
import { PostSearchResponse } from "@/modules/api/post/search/Response";
import { SplitList } from "@/modules/string/SplitList";
import { UserObject } from "@/modules/user/UserObject";
import { UserSearchResponse } from "@/modules/api/user/search/Response";
import { VoteObject } from "@/modules/vote/VoteObject";
import { VoteSearchResponse } from "@/modules/api/vote/search/Response";

export class ClaimObject {
  private post: PostSearchResponse;
  private user: UserSearchResponse;
  private prnt: PostSearchResponse | undefined;
  private vote: VoteSearchResponse[];

  private claimOwner: UserObject;
  private claimParent: ClaimObject | undefined;
  private claimUpside: ClaimUpside;
  private claimVotes: ClaimVotes;

  constructor(post: PostSearchResponse, user: UserSearchResponse, prnt: PostSearchResponse | undefined, vote: VoteSearchResponse[]) {
    {
      this.post = post;
      this.user = user;
      this.prnt = prnt;
      this.vote = vote;
    }

    {
      this.claimOwner = new UserObject(user);
      this.claimParent = prnt ? new ClaimObject(prnt, EmptyUserSearchResponse(), undefined, []) : undefined;
      this.claimVotes = NewClaimVotes(post);
      this.claimUpside = NewClaimUpside(this.claimVotes, vote.map((x) => (new VoteObject(x))));
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

  //
  // public
  //

  chain(): number {
    return Number(this.post.chain);
  }

  contract(): Address {
    return this.post.contract as Address;
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
    const spl = SplitList(this.post.lifecycle, ":");
    return spl[1].toLowerCase() === "pending";
  }

  token(): string {
    return this.post.token;
  }

  upside(): ClaimUpside {
    return this.claimUpside;
  }

  votes(): ClaimVotes {
    return this.claimVotes;
  }
}
