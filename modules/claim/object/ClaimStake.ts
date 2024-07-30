import { ClaimOption } from "@/modules/claim/object/ClaimOption";
import { SplitList } from "@/modules/string/SplitList";

export interface ClaimStake {
  agree: number;
  disagree: number;
  initial: number;
  minimum: number;
  probability: number;
  upside: number;
  user: number;
}

// CalculateClaimStake takes the apischema formatted string of staking
// information for the given claim and returns an object of relevant staking
// information in structured form. The inline comments below are based on the
// following apischema formatted string value, where, as a reminder, the format
// is "agreement,disagree,minimum,initial,user".
//
//     "15.273,2.773,0.5,0.5,1.5"
//
export const CalculateClaimStake = (stk: string, opt: ClaimOption): ClaimStake => {
  const num = SplitList(stk).map((x: string) => {
    return parseFloat(x);
  });

  let claimStake: ClaimStake = {
    agree: num[0],
    disagree: num[1],
    initial: num[3],
    minimum: num[2],
    probability: 0,
    upside: 0,
    user: num[4],
  };

  // Calculate the probability as the fraction of staked reputation that agrees
  // with the proposed claim. If for instance 9 ETH are staked in agreement and
  // 1 ETH is staked in disagreement, then the claims probability is 90%. On the
  // other hand, if there would be only 1 ETH staked in agreement, and 9 ETH
  // staked in disagreement, the proposed claim would only have a probability of
  // 10% to be true.
  {
    claimStake.probability = claimStake.agree / (claimStake.agree + claimStake.disagree) * 100;
  }

  // Only calculate the callers upside if that very user did in fact participate
  // in the given market. If the provided apischema option is neither "true" nor
  // "false", but an empty string, then this means that the caller has no skin
  // in the game here.
  if (opt.stake) {
    claimStake.upside = calculateUpside(claimStake, opt);
  }

  return claimStake;
};

const calculateUpside = (stk: ClaimStake, opt: ClaimOption): number => {
  // Calculate the user's share of stake according to the option that the user
  // expressed their opinion on.
  //
  //     1.5 / 15.273 = 0.09821253192
  //
  const share = stk.user / (opt.stake && opt.agree ? stk.agree : stk.disagree);

  // Calculate the user's token rewards according to the other side of the bet
  // that the user can capture.
  //
  //     0.09821253192 * 2.773 = 0.272343351
  //
  const reward = share * (opt.stake && opt.agree ? stk.disagree : stk.agree);

  // Calculate the user's potential upside based on hypothetical rewards, as if
  // the user would be proven right upon claim resolution.
  //
  //     0.272343351 / 1.5 = 0.181562234
  //
  const upside = reward / stk.user * 100;

  return upside;
};
