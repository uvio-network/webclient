import moment from "moment";

import { ClaimUpside, CreateClaimUpside } from "@/modules/claim/ClaimUpside";
import { ClaimVotes, CreateClaimVotes } from "@/modules/claim/ClaimVotes";
import { EmptyUserSearchResponse } from "@/modules/api/user/search/Response";
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
      this.claimVotes = CreateClaimVotes(post);
      this.claimUpside = CreateClaimUpside(this.claimVotes, vote.map((x) => (new VoteObject(x))));
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
    return this.post.lifecycle;
  }

  markdown(): string {
    return this.post.text;
  }

  parent(): ClaimObject | undefined {
    return this.claimParent;
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