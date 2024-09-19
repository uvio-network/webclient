import { API } from "@/modules/api/post/API";
import { PostSearchRequest } from "@/modules/api/post/search/Request";
import { PostSearchResponse } from "@/modules/api/post/search/Response";

export async function PostSearch(tok: string, req: PostSearchRequest[]): Promise<PostSearchResponse[]> {
  try {
    const cal = await API.search(
      {
        filter: req[0].time === "latest" ? { paging: { kind: "page", start: "0", stop: "49" } } : {},
        object: req.map((x) => ({
          intern: {
            id: x.id || "",
            owner: x.owner || "",
            tree: x.tree || "",
          },
          public: {
            labels: x.labels || "",
            lifecycle: x.lifecycle || "",
          },
          symbol: {
            list: x.list || "",
            time: x.time || "",
            vote: x.vote || "",
          },
        })),
      },
      {
        meta: tok ? { authorization: "Bearer " + tok } : {},
      },
    );

    return cal.response.object.map((x) => ({
      // extern
      samples: x.extern?.samples || {},

      // intern
      created: x.intern?.created || "",
      id: x.intern?.id || "",
      owner: x.intern?.owner || "",
      tree: x.intern?.tree || "",

      //public
      chain: x.public?.chain || "",
      expiry: x.public?.expiry || "",
      hash: x.public?.hash || "",
      kind: x.public?.kind || "",
      labels: x.public?.labels || "",
      lifecycle: x.public?.lifecycle || "",
      meta: x.public?.meta || "",
      parent: x.public?.parent || "",
      text: x.public?.text || "",
      token: x.public?.token || "",
      votes: x.public?.votes || "",
    }));
  } catch (err) {
    return Promise.reject(err);
  }
}
