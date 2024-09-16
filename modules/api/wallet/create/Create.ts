import { API } from "@/modules/api/wallet/API";
import { WalletCreateRequest } from "@/modules/api/wallet/create/Request";
import { WalletCreateResponse } from "@/modules/api/wallet/create/Response";

export async function WalletCreate(tok: string, req: WalletCreateRequest[]): Promise<WalletCreateResponse[]> {
  try {
    const cal = await API.create(
      {
        object: req.map((x) => ({
          intern: {},
          public: {
            active: x.active,
            address: x.address,
            description: x.description,
            kind: x.kind,
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
