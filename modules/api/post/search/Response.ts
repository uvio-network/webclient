export interface PostSearchResponse {
  // extern
  samples: { [key: string]: string };

  // intern
  created: string;
  id: string;
  owner: string;
  tree: string;

  // public
  chain: string;
  contract: string;
  expiry: string;
  hash: string;
  kind: string;
  labels: string;
  lifecycle: string;
  meta: string;
  parent: string;
  summary: string;
  text: string;
  token: string;
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
