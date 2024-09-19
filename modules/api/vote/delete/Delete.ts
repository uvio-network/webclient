import { API } from "@/modules/api/vote/API";
import { VoteDeleteRequest } from "@/modules/api/vote/delete/Request";
import { VoteDeleteResponse } from "@/modules/api/vote/delete/Response";

export async function VoteDelete(tok: string, req: VoteDeleteRequest[]): Promise<VoteDeleteResponse[]> {
  try {
    const cal = await API.delete(
      {
        object: req.map((x) => ({
          intern: {
            id: x.id,
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
