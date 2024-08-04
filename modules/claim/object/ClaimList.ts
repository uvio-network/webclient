import * as ToastSender from "@/components/toast/ToastSender";

import { ClaimObject } from "@/modules/claim/object/ClaimObject";
import { PostSearch } from "@/modules/api/post/search/Search";
import { PostSearchRequest } from "@/modules/api/post/search/Request";
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

    const map = new Map<string, UserSearchResponse>();
    for (const x of use) {
      map.set(x.id, x);
    }

    for (const x of pos) {
      const y = map.get(x.owner);
      if (y) {
        lis.push(new ClaimObject(x, y, []));
      } else {
        console.error("The received lists of server responses are inconsistent. At least one UserSearchResponse could not be found for its corresponding PostSearchResponse.");
        return [];
      }
    }

    // Sort the list of claim objects based on their time of creation, in
    // decending order. This allows us to show the newest claims first.
    {
      lis.sort((x: ClaimObject, y: ClaimObject) => y.created().diff(x.created()));
    }
  } catch (err) {
    ToastSender.Error("Fog mey, it's even more over than we thought it was!");
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
