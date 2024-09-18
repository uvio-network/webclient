import * as ToastSender from "@/components/toast/ToastSender";

import { ClaimObject } from "@/modules/claim/ClaimObject";
import { PostSearch } from "@/modules/api/post/search/Search";
import { PostSearchRequest } from "@/modules/api/post/search/Request";
import { PostSearchResponse } from "@/modules/api/post/search/Response";
import { UniqueOwners } from "@/modules/api/post/search/Response";
import { SystemUserSearchResponse, UserSearchResponse } from "@/modules/api/user/search/Response";
import { UserSearch } from "@/modules/api/user/search/Search";

export const NewClaimList = async (req: PostSearchRequest[]): Promise<ClaimObject[]> => {
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
      // We need to check for some eventual inconsistencies. When we fetch posts
      // and users, then there should be a user object for every post object
      // that we deal with. The exception here are posts that have been created
      // automatically by the system. Those posts have the owner ID 1 associated
      // with them, because those posts have been automatically created by the
      // system. And so for the user ID 1 there does not exist a user object,
      // which means we have to ignore those cases in the condition below.
      let y = ump.get(x.owner);
      if (!y) {
        if (x.owner == "1") {
          y = SystemUserSearchResponse();
        } else {
          console.error("ClaimList", "ID", x.id, "owner", x.owner);
          ToastSender.Error("The received lists of server responses are inconsistent. At least one UserSearchResponse could not be found for its corresponding PostSearchResponse.");
          return [];
        }
      }

      const z = pmp.get(x.parent);
      if (!z && x.parent !== "") {
        console.error("ClaimList", "ID", x.id, "parent", x.parent);
        ToastSender.Error("The received lists of server responses are inconsistent. At least one parent PostSearchResponse could not be found for its corresponding comment PostSearchResponse.");
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
    ToastSender.Error(String(err));
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
