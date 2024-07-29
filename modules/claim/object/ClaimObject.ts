import moment from "moment";

import { PostSearchResponse } from "@/modules/api/post/search/Response";
import { SplitList } from "@/modules/string/SplitList";
import { UserObject } from "@/modules/user/object/UserObject";

interface ClaimStake {
  agree: number;
  disagree: number;
  initial: number;
  minimum: number;
  pnl: number;
  user: number;
}

export class ClaimObject {
  private claimStake: ClaimStake;
  private post: PostSearchResponse;
  private user: UserObject;

  constructor(post: PostSearchResponse) {
    if (post.kind !== "claim") {
      throw Error(`The claim object requires the provided post kind to be "claim". Post kind "${post.kind}" was given instead.`);
    }

    {
      this.claimStake = calStk(post.stake, JSON.parse(post.option.toLowerCase()));
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

  option(): boolean {
    return JSON.parse(this.post.option.toLowerCase());
  }

  stake(): ClaimStake {
    return this.claimStake;
  }

  token(): string {
    return this.post.token;
  }
}

const calStk = (stk: string, opt: boolean): ClaimStake => {
  const num = SplitList(stk).map((x: string) => {
    return parseFloat(x);
  });

  let stake: ClaimStake = {
    agree: num[0],
    disagree: num[1],
    initial: num[3],
    minimum: num[2],
    pnl: 0,
    user: num[4],
  };

  // The following calculations are based on the following Post.Stake response
  // value where the format is "agreement,disagree,minimum,initial,user".
  //
  //     "15.273,2.773,0.5,0.5,1.5"
  //

  // Calculate the user's share of stake according to the option that the user
  // expressed their opinion on.
  const share = stake.user / (opt ? stake.agree : stake.disagree); // 1.5 / 15.273 = 0.09821253192

  // Calculate the user's token rewards according to the other side of the bet
  // that the user can capture.
  const reward = share * (opt ? stake.disagree : stake.agree); // 0.09821253192 * 2.773 = 0.272343351

  // Calculate the user's PnL based on the hypothetical rewards, given that
  // the user would be proven right upon claim resolution.
  const pnl = reward / stake.user * 100; // 0.272343351 / 1.5

  {
    stake.pnl = pnl;
  }

  return stake;
};
