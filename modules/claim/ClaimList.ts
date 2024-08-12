import * as ToastSender from "@/components/toast/ToastSender";

import { ClaimObject } from "@/modules/claim/ClaimObject";
import { PostSearch } from "@/modules/api/post/search/Search";
import { PostSearchRequest } from "@/modules/api/post/search/Request";
import { PostSearchResponse } from "@/modules/api/post/search/Response";
import { UniqueOwners } from "@/modules/api/post/search/Response";
import { UserSearchResponse } from "@/modules/api/user/search/Response";
import { UserSearch } from "@/modules/api/user/search/Search";

export const CreateClaimList = async (req: PostSearchRequest[]): Promise<ClaimObject[]> => {
  const lis: ClaimObject[] = [];

  try {
    const pos = await PostSearch("", req);

    if (pos.length === 0) {
      return [];
    }

    const use = await UserSearch("", UniqueOwners(pos).map(x => ({ id: x })));

    const pmp = new Map<string, PostSearchResponse>();
    for (const x of pos) {
      pmp.set(x.id, x);
    }

    const ump = new Map<string, UserSearchResponse>();
    for (const x of use) {
      ump.set(x.id, x);
    }

    for (const x of pos) {
      const y = ump.get(x.owner);
      if (!y) {
        console.error("The received lists of server responses are inconsistent. At least one UserSearchResponse could not be found for its corresponding PostSearchResponse.");
        return [];
      }

      const z = pmp.get(x.parent);
      if (!z && x.kind === "comment") {
        console.error("The received lists of server responses are inconsistent. At least one parent PostSearchResponse could not be found for its corresponding comment PostSearchResponse.");
        return [];
      }

      {
        lis.push(new ClaimObject(x, y, z, []));
      }
    }

    // Sort the list of claim objects based on their time of creation, in
    // decending order. This allows us to show the newest claims first.
    {
      lis.sort((x: ClaimObject, y: ClaimObject) => y.created().diff(x.created()));
    }
  } catch (err) {
    console.error(err);
    ToastSender.Error("Fog mey, it's even more over than we thought it was!");
    return Promise.reject(err);
  }

  return lis;
};

export const ClaimIDs = (inp: ClaimObject[]): string[] => {
  const out: string[] = [];

  for (const x of inp) {
    out.push(x.id().toString());
  }

  return out;
};
