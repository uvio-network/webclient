import moment from "moment";

import { ClaimUpside, CreateClaimUpside } from "@/modules/claim/object/ClaimUpside";
import { ClaimVotes, CreateClaimVotes } from "@/modules/claim/object/ClaimVotes";
import { PostSearchResponse } from "@/modules/api/post/search/Response";
import { SplitList } from "@/modules/string/SplitList";
import { UserObject } from "@/modules/user/object/UserObject";
import { UserSearchResponse } from "@/modules/api/user/search/Response";
import { VoteObject } from "@/modules/vote/object/VoteObject";
import { VoteSearchResponse } from "@/modules/api/vote/search/Response";

export class ClaimObject {
  private post: PostSearchResponse;
  private user: UserSearchResponse;
  private vote: VoteSearchResponse[];

  private claimOwner: UserObject;
  private claimUpside: ClaimUpside;
  private claimVotes: ClaimVotes;

  constructor(post: PostSearchResponse, user: UserSearchResponse, vote: VoteSearchResponse[]) {
    if (post.kind !== "claim") {
      throw Error(`The claim object requires the provided post kind to be "claim". Post kind "${post.kind}" was given instead.`);
    }

    {
      this.post = post;
      this.user = user;
      this.vote = vote;
    }

    {
      this.claimOwner = new UserObject(user);
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

  labels(): string[] {
    return SplitList(this.post.labels);
  }

  lifecycle(): string {
    return this.post.lifecycle;
  }

  markdown(): string {
    return this.post.text;
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
