import moment from "moment";

import { UserSearchResponse } from "@/modules/api/user/search/Response";

export class UserObject {
  private user: UserSearchResponse;

  constructor(user: UserSearchResponse) {
    this.user = user;
  }

  //
  // extern
  //

  staked(tok: string): number {
    for (const x of this.user.staked) {
      if (x.token === tok) return parseFloat(x.balance);
    }

    return 0;
  }

  //
  // intern
  //

  created(): moment.Moment {
    return moment.unix(Number(this.user.created)).utc();
  }

  id(): string {
    return this.user.id;
  }

  //
  // public
  //

  image(): string {
    return this.user.image;
  }

  name(): string {
    return this.user.name;
  }
}
