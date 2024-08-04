export interface PostCreateRequest {
  // public
  expiry: string;
  kind: string;
  labels: string;
  lifecycle: string;
  parent: string;
  text: string;
  token: string;
}
