import moment from "moment";

import { UserSearchResponse } from "@/modules/api/user/search/Response";

export class UserObject {
  private user: UserSearchResponse;

  constructor(user: UserSearchResponse) {
    this.user = user;
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
