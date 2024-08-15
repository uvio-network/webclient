export interface UserSearchResponse {
  // extern
  staked: UserSearchResponse_Staked[];

  // intern
  created: string;
  id: string;

  // public
  image: string;
  name: string;
}

export interface UserSearchResponse_Staked {
  balance: string;
  token: string;
}

export const EmptyUserSearchResponse = (): UserSearchResponse => {
  return {
    // extern
    staked: [],

    // intern
    created: "",
    id: "",

    // public
    image: "",
    name: "",
  };
};
