import { API } from "@/modules/api/post/API";
import { PostDeleteRequest } from "@/modules/api/post/delete/Request";
import { PostDeleteResponse } from "@/modules/api/post/delete/Response";

export async function PostDelete(tok: string, req: PostDeleteRequest[]): Promise<PostDeleteResponse[]> {
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
