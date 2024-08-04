import { API } from "@/modules/api/vote/API";
import { VoteSearchRequest } from "@/modules/api/vote/search/Request";
import { VoteSearchResponse } from "@/modules/api/vote/search/Response";

export async function VoteSearch(tok: string, req: VoteSearchRequest[]): Promise<VoteSearchResponse[]> {
  try {
    const cal = await API.search(
      {
        object: req.map((x) => ({
          intern: {
            id: x.id || "",
            owner: x.owner || "",
          },
          public: {
            claim: x.claim || "",
          },
        })),
      },
      {
        meta: tok ? { authorization: "Bearer " + tok } : {},
      },
    );

    return cal.response.object.map((x) => ({
      // intern
      created: x.intern?.created || "",
      id: x.intern?.id || "",
      owner: x.intern?.owner || "",

      //public
      claim: x.public?.claim || "",
      kind: x.public?.kind || "",
      option: x.public?.option || "",
      value: x.public?.value || "",
    }));
  } catch (err) {
    return Promise.reject(err);
  }
}
