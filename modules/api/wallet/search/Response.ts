export interface WalletSearchResponse {
  // intern
  created: string;
  id: string;
  owner: string;

  // public
  address: string;
  description: string;
  kind: string;
};
