import * as ToastSender from "@/components/toast/ToastSender";

import { VoteObject } from "@/modules/vote/VoteObject";
import { VoteSearch } from "@/modules/api/vote/search/Search";

export const NewVoteList = async (tok: string, cla: string[]): Promise<VoteObject[]> => {
  const lis: VoteObject[] = [];

  try {
    const vot = await VoteSearch(tok, cla.map((x) => ({ owner: "self", claim: x })));

    for (const x of vot) {
      lis.push(new VoteObject(x));
    }
  } catch (err) {
    ToastSender.Error("The beavers are sick of it, no more carpin' all them diems!");
  }

  return lis;
};
