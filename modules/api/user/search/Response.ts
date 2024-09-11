export interface UserSearchResponse {
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
    // intern
    created: "",
    id: "",

    // public
    image: "",
    name: "",
  };
};
