export interface VoteSearchResponse {
  // intern
  created: string;
  id: string;
  owner: string;

  // public
  claim: string;
  hash: string;
  kind: string;
  lifecycle: string;
  meta: string;
  option: string;
  value: string;
};

export const EmptyVoteSearchResponse = (): VoteSearchResponse => {
  return {
    // intern
    created: "",
    id: "",
    owner: "",

    // public
    claim: "",
    hash: "",
    kind: "",
    lifecycle: "",
    meta: "",
    option: "",
    value: "",
  };
};
