import { API } from "@/modules/api/vote/API";
import { VoteUpdateRequest } from "@/modules/api/vote/update/Request";
import { VoteUpdateResponse } from "@/modules/api/vote/update/Response";

export async function VoteUpdate(tok: string, req: VoteUpdateRequest[]): Promise<VoteUpdateResponse[]> {
  try {
    const cal = await API.update(
      {
        object: req.map((x) => ({
          intern: {
            id: x.id,
          },
          public: {
            hash: x.hash,
          },
        })),
      },
      {
        meta: tok ? { authorization: "Bearer " + tok } : {},
      },
    );

    return cal.response.object.map((x) => ({
      // intern
      status: x.intern?.status || "",
    }));
  } catch (err) {
    return Promise.reject(err);
  }
}
