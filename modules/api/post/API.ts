import * as Config from "@/modules/config";

import { TwirpFetchTransport } from "@protobuf-ts/twirp-transport";
import { APIClient } from "@uvio-network/apitscode/src/post/api.client";

export const API = new APIClient(new TwirpFetchTransport({
  baseUrl: Config.ApiServerRPCEndpoint,
  sendJson: Config.ApiServerRPCSendJSON,
}));
