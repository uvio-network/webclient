export interface VoteSearchResponse {
  // intern
  created: string;
  id: string;
  owner: string;

  // public
  claim: string;
  kind: string;
  option: string;
  value: string;
};
