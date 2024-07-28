import { API } from "@/modules/api/user/API";
import { UserCreateRequest } from "@/modules/api/user/create/Request";
import { UserCreateResponse } from "@/modules/api/user/create/Response";

export async function UserCreate(tok: string, req: UserCreateRequest[]): Promise<UserCreateResponse[]> {
  try {
    const cal = await API.create(
      {
        object: req.map((x) => ({
          intern: {},
          public: {
            image: x.image,
            name: x.name,
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
