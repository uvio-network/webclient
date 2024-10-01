import { NewPostSummary } from "@/modules/summary/PostSummary";
import { NewVoteSummary } from "@/modules/summary/VoteSummary";
import { PostSearchResponse } from "@/modules/api/post/search/Response";
import { PostSummary } from "@/modules/summary/PostSummary";
import { VoteObject } from "@/modules/vote/VoteObject";
import { VoteSummary } from "@/modules/summary/VoteSummary";

export interface Summary {
  post: PostSummary;
  vote: VoteSummary;
}

export const NewSummary = (pos: PostSearchResponse, vot: VoteObject[]): Summary => {
  const psm = NewPostSummary(pos);

  return {
    post: psm,
    vote: NewVoteSummary(psm, vot),
  };
};
