import { ClaimVotes } from "@/modules/claim/ClaimVotes";
import { VoteObject } from "@/modules/vote/VoteObject";

const agreement = 0;
const disagreement = 1;

export interface ClaimUpside {
  // hsitg expresses whether the user for which this upside is calculated has in
  // fact skin in the game, meaning the user in question has staked or voted on
  // the claim at hand.
  hsitg: boolean;
  // share is the potential percentage that the current user has to gain
  // theoretically for either side of the bet.
  //
  //     [0] aggrement
  //     [1] disaggrement
  //
  share: number[];
  // stake is the aggregated amount of tokens staked for either side of the bet.
  //
  //     [0] aggrement
  //     [1] disaggrement
  //
  stake: number[];
}

// NewClaimUpside returns the callers upside if that very user did in fact
// participate in the given market.
export const NewClaimUpside = (sum: ClaimVotes, res: VoteObject[]): ClaimUpside => {
  const ups = {
    hsitg: false,
    stake: [0, 0],
    share: [0, 0],
  };

  {
    ups.stake = calSta(res);
  }

  if (ups.stake[agreement] !== 0) {
    ups.hsitg = true;
    ups.share[agreement] = calSha(sum, ups.stake[agreement], true);
  }

  if (ups.stake[disagreement] !== 0) {
    ups.hsitg = true;
    ups.share[disagreement] = calSha(sum, ups.stake[disagreement], false);
  }

  return ups;
};

const calSha = (sum: ClaimVotes, use: number, opt: boolean): number => {
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
  return reward / use * 100;
};

const calSta = (res: VoteObject[]): number[] => {
  var lis: number[] = [0, 0];

  for (const x of res) {
    if (x.option()) {
      lis[agreement] += x.value();
    } else {
      lis[disagreement] += x.value();
    }
  }

  return lis;
}
