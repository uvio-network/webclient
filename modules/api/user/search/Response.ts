export interface UserSearchResponse {
  // intern
  created: string;
  id: string;

  // public
  image: string;
  name: string;
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
