export interface PostSearchRequest {
  // intern
  id?: string;
  owner?: string;
  tree?: string;

  // public
  labels?: string;

  // symbol
  list?: string;
  time?: string;
  vote?: string;
}
