import moment from "moment";

import * as ToastSender from "@/components/toast/ToastSender";

import { PostSearchResponse } from "@/modules/api/post/search/Response";
import { SplitList } from "@/modules/string/SplitList";

export class ClaimObject {
  private res: PostSearchResponse;

  constructor(res: PostSearchResponse) {
    if (res.kind !== "claim") {
      ToastSender.Error("Fog mey, it's even more over than we thought it was!");
    }

    {
      this.res = res;
    }
  }

  //
  // intern
  //

  created(): moment.Moment {
    return moment.unix(Number(this.res.created)).utc();
  }

  id(): number {
    return parseInt(this.res.id, 10);
  }

  //
  // public
  //

  expiry(): moment.Moment {
    return moment.unix(parseInt(this.res.expiry, 10)).utc();
  }

  labels(): string[] {
    return SplitList(this.res.labels);
  }

  lifecycle(): string {
    return this.res.lifecycle;
  }

  markdown(): string {
    return this.res.text;
  }

  stake(): number {
    return parseInt(this.res.stake, 10);
  }
}
