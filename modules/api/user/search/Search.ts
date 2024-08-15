import { API } from "@/modules/api/user/API";
import { UserSearchRequest } from "@/modules/api/user/search/Request";
import { UserSearchResponse } from "@/modules/api/user/search/Response";

export async function UserSearch(tok: string, req: UserSearchRequest[]): Promise<UserSearchResponse[]> {
  try {
    const cal = await API.search(
      {
        object: req.map((x) => ({
          intern: {
            id: x.id || "",
          },
          public: {
            name: x.name || "",
          },
        })),
      },
      {
        meta: tok ? { authorization: "Bearer " + tok } : {},
      },
    );

    return cal.response.object.map((x) => ({
      // extern
      staked: x.extern?.staked || [],

      // intern
      created: x.intern?.created || "",
      id: x.intern?.id || "",

      //public
      image: x.public?.image || "",
      name: x.public?.name || "",
    }));
  } catch (err) {
    return Promise.reject(err);
  }
}
