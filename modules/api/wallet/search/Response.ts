export interface WalletSearchResponse {
  // intern
  created: string;
  id: string;
  owner: string;

  // public
  active: string;
  address: string;
  description: string;
  kind: string;
  provider: string;
};
