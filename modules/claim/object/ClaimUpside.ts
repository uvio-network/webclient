import { ClaimVotes } from "@/modules/claim/object/ClaimVotes";
import { VoteObject } from "@/modules/vote/object/VoteObject";

export interface ClaimUpside {
  // total is the aggregated amount of staked reputation for either side of the
  // bet.
  //
  //     [0] aggrement
  //     [1] disaggrement
  //
  total: number[];
  // upside is the potential upside that the current user has for either side of
  // the bet, based on the total amount of reputation staked on the current
  // claim, and the user's share of the pool.
  //
  //     [0] aggrement
  //     [1] disaggrement
  //
  upside: number[];
}

// CreateClaimUpside returns the callers upside if that very user did in fact
// participate in the given market.
export const CreateClaimUpside = (sum: ClaimVotes, res: VoteObject[]): ClaimUpside => {
  const ups = {
    total: [0, 0],
    upside: [0, 0],
  };

  {
    ups.total = calTot(res);
  }

  if (ups.total[0] !== 0) {
    ups.upside[0] = calUps(sum, ups.total[0], true);
  }

  if (ups.total[1] !== 0) {
    ups.upside[1] = calUps(sum, ups.total[1], false);
  }

  return ups;
};

const calTot = (res: VoteObject[]): number[] => {
  var lis: number[] = [0, 0];

  for (const x of res) {
    if (x.option()) {
      lis[0] += x.value();
    } else {
      lis[1] += x.value();
    }
  }

  return lis;
}

const calUps = (sum: ClaimVotes, use: number, opt: boolean): number => {
  // Calculate the user's share of stake according to the option that the user
  // expressed their opinion on.
  //
  //     1.5 / 15.273 = 0.09821253192
  //
  const share = use / (opt ? sum.agreement : sum.disagreement);

  // Calculate the user's token rewards according to the other side of the bet
  // that the user can capture.
  //
  //     0.09821253192 * 2.773 = 0.272343351
  //
  const reward = share * (opt ? sum.disagreement : sum.agreement);

  // Calculate the user's potential upside based on hypothetical rewards, as if
  // the user would be proven right upon claim resolution.
  //
  //     0.272343351 / 1.5 = 0.181562234
  //
  const upside = reward / use * 100;

  return upside;
};
