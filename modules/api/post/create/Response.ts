export interface PostCreateResponse {
  // intern
  created: string;
  id: string;
}

export const EmptyPostCreateResponse = (id?: string): PostCreateResponse => {
  return {
    // intern
    created: "",
    id: id || "",
  };
};
