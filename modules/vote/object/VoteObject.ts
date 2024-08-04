import moment from "moment";

import { VoteSearchResponse } from "@/modules/api/vote/search/Response";

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

  option(): boolean {
    return this.vote.option.toLowerCase() === "true";
  }

  value(): number {
    return parseFloat(this.vote.value);
  }
}
