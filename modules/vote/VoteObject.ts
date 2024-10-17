import moment from "moment";

import { EmptyVoteSearchResponse } from "@/modules/api/vote/search/Response";
import { VoteSearchResponse } from "@/modules/api/vote/search/Response";

export const EmptyVoteObject = (): VoteObject => {
  return new VoteObject(EmptyVoteSearchResponse());
};

export class VoteObject {
  private vote: VoteSearchResponse;

  constructor(vote: VoteSearchResponse) {
    this.vote = vote;
  }

  //
  // getter
  //

  getVote(): VoteSearchResponse {
    return this.vote;
  }

  //
  // intern
  //

  created(): moment.Moment {
    return moment.unix(Number(this.vote.created)).utc();
  }

  id(): string {
    return this.vote.id;
  }

  owner(): string {
    return this.vote.owner;
  }

  //
  // public
  //

  claim(): string {
    return this.vote.claim;
  }

  kind(): string {
    return this.vote.kind;
  }

  lifecycle(): string {
    return this.vote.lifecycle;
  }

  option(): boolean {
    return this.vote.option.toLowerCase() === "true";
  }

  pending(): boolean {
    return this.lifecycle() === "pending";
  }

  value(): number {
    return parseFloat(this.vote.value);
  }
}
