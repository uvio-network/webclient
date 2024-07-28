import { API } from "@/modules/api/post/API";
import { PostCreateRequest } from "@/modules/api/post/create/Request";
import { PostCreateResponse } from "@/modules/api/post/create/Response";

export async function PostCreate(tok: string, req: PostCreateRequest[]): Promise<PostCreateResponse[]> {
  try {
    const cal = await API.create(
      {
        object: req.map((x) => ({
          intern: {},
          public: {
            expiry: x.expiry,
            kind: x.kind,
            lifecycle: x.lifecycle,
            option: x.option,
            parent: x.parent,
            stake: x.stake,
            text: x.text,
            token: x.token,
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
