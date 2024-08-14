export interface VoteCreateResponse {
  // intern
  created: string;
  id: string;
}

export const EmptyVoteCreateResponse = (): VoteCreateResponse => {
  return {
    // intern
    created: "",
    id: "",
  };
};
