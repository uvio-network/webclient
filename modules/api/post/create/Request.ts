export interface PostCreateRequest {
  // public
  chain: string;
  contract: string;
  expiry: string;
  hash: string;
  kind: string;
  labels: string;
  lifecycle: string;
  meta: string;
  parent: string;
  text: string;
  token: string;
}
