import { API } from "@/modules/api/wallet/API";
import { WalletSearchRequest } from "@/modules/api/wallet/search/Request";
import { WalletSearchResponse } from "@/modules/api/wallet/search/Response";

export async function WalletSearch(tok: string, req: WalletSearchRequest[]): Promise<WalletSearchResponse[]> {
  try {
    const cal = await API.search(
      {
        object: req.map((x) => ({
          intern: {
            id: x.id || "",
            owner: x.owner || "",
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
      active: x.public?.active || "",
      address: x.public?.address || "",
      description: x.public?.description || "",
      kind: x.public?.kind || "",
      provider: x.public?.provider || "",
    }));
  } catch (err) {
    return Promise.reject(err);
  }
}
