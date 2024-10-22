import { ClaimObject } from "@/modules/claim/ClaimObject";
import { EmptyUserSearchResponse } from "@/modules/api/user/search/Response";
import { PostSearch } from "@/modules/api/post/search/Search";
import { PostSearchRequest } from "../api/post/search/Request";
import { PostSearchResponse } from "@/modules/api/post/search/Response";

export const NewSearchParentFunc = (req: PostSearchRequest) => {
  return async (): Promise<ClaimObject | undefined> => {
    const pos = await PostSearch("", [req]);

    // When commenting, we want to show the claim that is being commented on
    // similar to the way that users see claims on the timeline. Some claims are
    // standalone like proposes, some claims are embedded like resolves. If a
    // user comments on a resolve, then we want to show the resolve and the
    // embedded propose. In such a case, the propose being embedded becomes the
    // child of the resolve. This is the opposite of the representation within a
    // claim tree, where the resolve is the child of the propose.
    //
    // When disputing, we want to show the claim that is being disputed on
    // similar to the way that users see claims on the timeline. The claims we
    // are dealing with here are embedded resolves. Therefore we want to show
    // the resolve and the embedded propose. In such a case, the propose being
    // embedded becomes the child of the resolve. This is the opposite of the
    // representation within a claim tree, where the resolve is the child of the
    // propose.
    let child: PostSearchResponse | undefined = undefined;

    for (const x of pos) {
      if (x.kind === "claim" && x.id !== req.id) {
        child = x;
        break;
      }
    }

    for (const x of pos) {
      if (x.kind === "claim" && x.id === req.id) {
        return new ClaimObject(x, EmptyUserSearchResponse(), child, []);
      }
    }

    return undefined;
  };
};
