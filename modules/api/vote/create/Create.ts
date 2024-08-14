import { API } from "@/modules/api/vote/API";
import { VoteCreateRequest } from "@/modules/api/vote/create/Request";
import { VoteCreateResponse } from "@/modules/api/vote/create/Response";

export async function VoteCreate(tok: string, req: VoteCreateRequest[]): Promise<VoteCreateResponse[]> {
  try {
    const cal = await API.create(
      {
        object: req.map((x) => ({
          intern: {},
          public: {
            chain: x.chain,
            claim: x.claim,
            hash: x.hash,
            kind: x.kind,
            lifecycle: x.lifecycle,
            meta: x.meta,
            option: x.option,
            value: x.value,
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
    }));
  } catch (err) {
    return Promise.reject(err);
  }
}
