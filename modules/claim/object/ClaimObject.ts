import moment from "moment";

import { PostSearchResponse } from "@/modules/api/post/search/Response";
import { SplitList } from "@/modules/string/SplitList";
import { UserObject } from "@/modules/user/object/UserObject";

export class ClaimObject {
  private post: PostSearchResponse;
  private user: UserObject;

  constructor(post: PostSearchResponse) {
    if (post.kind !== "claim") {
      throw Error(`The claim object requires the provided post kind to be "claim". Post kind "${post.kind}" was given instead.`);
    }

    {
      this.post = post;
      this.user = new UserObject({ created: "", id: "8236427635", image: "", name: "RevengeArch47" }); // TODO
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

  stake(): number {
    return parseInt(this.post.stake, 10);
  }
}
