import moment from "moment";

import { ClaimStake, CalculateClaimStake } from "@/modules/claim/object/ClaimStake";
import { ClaimOption, ParseClaimOption } from "@/modules/claim/object/ClaimOption";
import { PostSearchResponse } from "@/modules/api/post/search/Response";
import { SplitList } from "@/modules/string/SplitList";
import { UserObject } from "@/modules/user/object/UserObject";
import { UserSearchResponse } from "@/modules/api/user/search/Response";

export class ClaimObject {
  private claimOption: ClaimOption;
  private claimStake: ClaimStake;
  private post: PostSearchResponse;
  private user: UserObject;

  constructor(post: PostSearchResponse, user: UserSearchResponse) {
    if (post.kind !== "claim") {
      throw Error(`The claim object requires the provided post kind to be "claim". Post kind "${post.kind}" was given instead.`);
    }

    {
      this.claimOption = ParseClaimOption(post.option);
      this.claimStake = CalculateClaimStake(post.stake, this.claimOption);
      this.post = post;
      this.user = new UserObject(user);
    }
  }

  //
  // intern
  //

  created(): moment.Moment {
    return moment.unix(Number(this.post.created)).utc();
  }

  id(): number {
    return parseInt(this.post.id, 10);
  }

  owner(): UserObject {
    return this.user;
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

  option(): ClaimOption {
    return this.claimOption;
  }

  stake(): ClaimStake {
    return this.claimStake;
  }

  token(): string {
    return this.post.token;
  }
}
