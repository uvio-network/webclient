import { PostSearchResponse } from "@/modules/api/post/search/Response";
import { SplitList } from "@/modules/string/SplitList";

export interface ClaimVotes {
  agreement: number;
  creator: number;
  disagreement: number;
  minimum: number;
  probability: number;
  total: number;
}

// NewClaimVotes takes the apischema formatted vote summary for the given claim
// and returns an object of relevant voting information in structured form. The
// received format is "agreement,disagreement,minimum,creator".
//
//     "15.273,2.773,0.5,1.5"
//
export const NewClaimVotes = (pos: PostSearchResponse): ClaimVotes => {
  const num = SplitList(pos.votes).map((x: string) => {
    return parseFloat(x);
  });

  const sum: ClaimVotes = {
    agreement: num[0] || 0,
    creator: num[3] || 0,
    disagreement: num[1] || 0,
    minimum: num[2] || 0,
    probability: 0,
    total: 0,
  };

  sum.total = sum.agreement + sum.disagreement;

  // Calculate the probability as the fraction of staked reputation that agrees
  // with the proposed claim. If for instance 9 ETH are staked in agreement and
  // 1 ETH is staked in disagreement, then the claims probability is 90%. On the
  // other hand, if there would be only 1 ETH staked in agreement, and 9 ETH
  // staked in disagreement, the proposed claim would only have a probability of
  // 10% to be true.
  if (sum.total > 0) {
    sum.probability = sum.agreement / sum.total * 100;
  }

  return sum;
};
