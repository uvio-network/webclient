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

export const SystemUserSearchResponse = (): UserSearchResponse => {
  return {
    // intern
    created: "1726597877",
    id: "1",

    // public
    image: "https://picsum.photos/id/137/48/48",
    name: "Sleeper Service",
  };
};
