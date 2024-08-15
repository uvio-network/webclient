import { API } from "@/modules/api/post/API";
import { PostUpdateRequest } from "@/modules/api/post/update/Request";
import { PostUpdateResponse } from "@/modules/api/post/update/Response";

export async function PostUpdate(tok: string, req: PostUpdateRequest[]): Promise<PostUpdateResponse[]> {
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
