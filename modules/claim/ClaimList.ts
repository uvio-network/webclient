import * as ToastSender from "@/components/toast/ToastSender";

import { ClaimObject } from "@/modules/claim/ClaimObject";
import { PostSearch } from "@/modules/api/post/search/Search";
import { PostSearchRequest } from "@/modules/api/post/search/Request";
import { PostSearchResponse } from "@/modules/api/post/search/Response";
import { SystemUserSearchResponse } from "@/modules/api/user/search/Response";
import { UniqueOwners } from "@/modules/api/post/search/Response";
import { UserSearch } from "@/modules/api/user/search/Search";
import { UserSearchResponse } from "@/modules/api/user/search/Response";
import { VoteSearch } from "@/modules/api/vote/search/Search";
import { VoteSearchResponse } from "@/modules/api/vote/search/Response";

export const NewClaimList = async (tok: string, req: PostSearchRequest): Promise<ClaimObject[]> => {
  try {
    const pos = await PostSearch(tok, [req]);

    if (pos.length === 0) {
      return [];
    }

    const [use, vot] = await Promise.all([
      UserSearch(tok, UniqueOwners(pos).map(x => ({ id: x }))),
      tok && tok !== "" ? VoteSearch(tok, pos.filter((x) => (x.kind === "claim")).map((x) => ({ owner: "self", claim: x.id }))) : Promise.resolve([]),
    ]);

    const pmp = new Map<string, PostSearchResponse>();
    for (const x of pos) {
      pmp.set(x.id, x);
    }

    const ump = new Map<string, UserSearchResponse>();
    for (const x of use) {
      ump.set(x.id, x);
    }

    const vmp = new Map<string, VoteSearchResponse[]>();
    for (const x of vot) {
      if (!vmp.has(x.claim)) {
        vmp.set(x.claim, []);
      }

      if (vmp.has(x.claim)) {
        const l = vmp.get(x.claim)!;
        l.push(x);
        vmp.set(x.claim, l);
      }
    }

    const tmp: ClaimObject[] = [];

    for (const pst of pos) {
      // We need to check for some eventual inconsistencies. When we fetch posts
      // and users, then there should be a user object for every post object
      // that we deal with. The exception here are posts that have been created
      // automatically by the system. Those posts have the owner ID 1 associated
      // with them, because those posts have been automatically created by the
      // system. And so for the user ID 1 there does not exist a user object,
      // which means we have to ignore those cases in the condition below.
      let usr = ump.get(pst.owner);
      if (!usr) {
        if (pst.owner == "1") {
          usr = SystemUserSearchResponse();
        } else {
          console.error("ClaimList", "ID", pst.id, "owner", pst.owner);
          ToastSender.Error("The received lists of server responses are inconsistent. At least one UserSearchResponse could not be found for its corresponding PostSearchResponse.");
          return [];
        }
      }

      const prn = pmp.get(pst.parent);
      if (!prn && pst.parent !== "") {
        console.error("ClaimList", "id", pst.id, "lifecycle", pst.lifecycle, "parent", pst.parent);
        ToastSender.Error("The received lists of server responses are inconsistent. At least one parent PostSearchResponse could not be found for its corresponding comment PostSearchResponse.");
        return [];
      }

      {
        tmp.push(new ClaimObject(pst, usr, prn, vmp.get(pst.id) || []));
      }
    }

    const cmp = new Map<string, ClaimObject>();
    for (const x of tmp) {
      cmp.set(x.id(), x);
    }

    // The list below makes every parent to reference its parent, so that we
    // have e.g. comment -> resolve -> propose.
    const lis: ClaimObject[] = [];

    for (const x of tmp) {
      if (x.parent()) {
        lis.push(new ClaimObject(
          x.getPost(),
          x.getUser(),
          cmp.get(x.parent()!.id()),
          x.getVote(),
        ));
      } else {
        lis.push(x);
      }
    }

    // Sort the list of claim objects based on their time of creation, in
    // decending order. This allows us to show the newest claims first.
    {
      lis.sort((x: ClaimObject, y: ClaimObject) => y.created().diff(x.created()));
    }

    return lis;
  } catch (err) {
    console.error(err);
    ToastSender.Error(String(err));
    return Promise.reject(err);
  }
};
