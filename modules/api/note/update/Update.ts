import { API } from "@/modules/api/note/API";
import { NoteUpdateRequest } from "@/modules/api/note/update/Request";
import { NoteUpdateResponse } from "@/modules/api/note/update/Response";

export async function NoteUpdate(tok: string, req: NoteUpdateRequest[]): Promise<NoteUpdateResponse[]> {
  try {
    const cal = await API.update(
      {
        object: req.map((x) => ({
          public: {
            pointer: x.pointer,
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
