export interface PostSearchResponse {
  // intern
  created: string;
  id: string;
  owner: string;
  tree: string;

  // public
  expiry: string;
  kind: string;
  labels: string;
  lifecycle: string;
  parent: string;
  text: string;
  token: string;
  votes: string;
};

export const UniqueOwners = (inp: PostSearchResponse[]): string[] => {
  const set = new Set<string>();

  const out: string[] = [];

  for (const x of inp) {
    if (!set.has(x.owner)) {
      out.push(x.owner);
      set.add(x.owner);
    }
  }

  return out;
};
