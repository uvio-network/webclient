export interface VoteCreateResponse {
  // intern
  created: string;
  id: string;
}

export const EmptyVoteCreateResponse = (id?: string): VoteCreateResponse => {
  return {
    // intern
    created: "",
    id: id || "",
  };
};
