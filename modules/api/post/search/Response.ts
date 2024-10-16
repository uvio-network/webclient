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

export const EmptyPostSearchResponse = (): PostSearchResponse => {
  return {
    // extern
    samples: {},

    // intern
    created: "",
    id: "",
    owner: "",
    tree: "",

    // public
    chain: "",
    contract: "",
    expiry: "",
    hash: "",
    kind: "",
    labels: "",
    lifecycle: "",
    meta: "",
    parent: "",
    summary: "",
    text: "",
    token: "",
  };
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
