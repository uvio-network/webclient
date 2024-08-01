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
          },
          symbol: {
            list: x.list || "",
            time: x.time || "",
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
      tree: x.intern?.tree || "",

      //public
      expiry: x.public?.expiry || "",
      kind: x.public?.kind || "",
      labels: x.public?.labels || "",
      lifecycle: x.public?.lifecycle || "",
      option: x.public?.option || "",
      stake: x.public?.stake || "",
      parent: x.public?.parent || "",
      text: x.public?.text || "",
      token: x.public?.token || "",
    }));
  } catch (err) {
    return Promise.reject(err);
  }
}
