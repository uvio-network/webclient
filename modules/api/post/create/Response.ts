export interface PostCreateResponse {
  // intern
  created: string;
  id: string;
}

export const EmptyPostCreateResponse = (): PostCreateResponse => {
  return {
    // intern
    created: "",
    id: "",
  };
};
