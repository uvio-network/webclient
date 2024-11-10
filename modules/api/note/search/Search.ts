import moment from "moment";

import { API } from "@/modules/api/note/API";
import { NoteSearchRequest } from "@/modules/api/note/search/Request";
import { NoteSearchResponse } from "@/modules/api/note/search/Response";
import { SearchI_Filter } from "@uvio-network/apitscode/src/note/search";

export async function NoteSearch(tok: string, req: NoteSearchRequest[]): Promise<NoteSearchResponse[]> {
  try {
    const cal = await API.search(
      {
        filter: newFil(req[0].paging),
        object: req.map((x) => ({
          public: {
            kind: x.kind || "",
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

      //public
      kind: x.public?.kind || "",
      message: x.public?.message || "",
      pointer: cal.response.filter?.pointer || "",
      resource: x.public?.resource || "",
    }));
  } catch (err) {
    return Promise.reject(err);
  }
}

const newFil = (pag: "page" | string): SearchI_Filter => {
  if (pag === "page") {
    return { paging: { kind: "page", start: "0", stop: "49" } };
  }

  return { paging: { kind: "time", start: pag, stop: uniSec() } };
};

const uniSec = (): string => {
  return moment().utc().unix().toString();
};
