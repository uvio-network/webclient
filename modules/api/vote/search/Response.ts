export interface VoteSearchResponse {
  // intern
  created: string;
  id: string;
  owner: string;

  // public
  chain: string;
  claim: string;
  hash: string;
  kind: string;
  lifecycle: string;
  meta: string;
  option: string;
  value: string;
};
