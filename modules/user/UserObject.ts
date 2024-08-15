import moment from "moment";

import { TokenStore } from "@/modules/token/TokenStore";
import { UserSearchResponse } from "@/modules/api/user/search/Response";

export class UserObject {
  private user: UserSearchResponse;

  constructor(user: UserSearchResponse) {
    this.user = user;
  }

  //
  // extern
  //

  staked(tok: string): string {
    const { allocated, available } = TokenStore.getState();

    for (const x of this.user.staked) {
      if (x.token === tok) {
        const sta = parseFloat(x.balance) || 0;
        const alo = allocated[x.token]?.balance || 0;
        const pre = available[x.token]?.precision || 2;

        return (sta + alo).toFixed(pre);
      }
    }

    return "0.00";
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
