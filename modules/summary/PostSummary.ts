import { PostSearchResponse } from "@/modules/api/post/search/Response";
import { SplitList } from "@/modules/string/SplitList";

export interface PostSummary {
  // agreement is the amount of stakes or votes committed in agreement on this
  // post.
  agreement: number;
  // creator is the total amount of stakes or votes that the proposer committed
  // in total on this post. This number can be any positive number on post
  // objects of lifecycle phase "propose".  This number is either 0 or 1 on post
  // objects of lifecycle phase "resolve".
  creator: number;
  // disagreement is the amount of stakes or votes committed in disagreement on
  // this post.
  disagreement: number;
  // minimum is the minimum amount of stake required in order to participate in
  // any given propose. This number is 0 for any given resolve.
  minimum: number;
  probability: number;
  // total is simply the sum of agreement and disagreement.
  total: number;
}

// NewPostSummary takes the apischema formatted vote summary for the given claim
// and returns an object of relevant voting information in structured form. The
// received format is "agreement,disagreement,minimum,creator".
//
//     "15.273,2.773,0.5,1.5"
//
export const NewPostSummary = (pos: PostSearchResponse): PostSummary => {
  const num = SplitList(pos.summary).map((x: string) => {
    return parseFloat(x);
  });

  const sum: PostSummary = {
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
    sum.probability = (sum.agreement / sum.total) * 100;
  }

  return sum;
};
