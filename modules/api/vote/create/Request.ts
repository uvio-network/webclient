export interface VoteCreateRequest {
  // public
  claim: string;
  hash: string;
  kind: string;
  lifecycle: string;
  meta: string;
  option: string;
  value: string;
}

export const EmptyVoteCreateRequest = (): VoteCreateRequest => {
  // public
  return {
    claim: "",
    hash: "",
    kind: "",
    lifecycle: "",
    meta: "",
    option: "",
    value: "",
  };
};
