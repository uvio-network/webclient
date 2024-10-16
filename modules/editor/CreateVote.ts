import { EditorStore } from "@/modules/editor/EditorStore";
import { UserStore } from "@/modules/user/UserStore";
import { VoteCreate } from "@/modules/api/vote/create/Create";
import { VoteCreateRequest } from "@/modules/api/vote/create/Request";

export const CreateVote = async () => {
  const edi = EditorStore.getState();
  const use = UserStore.getState().user;

  const req: VoteCreateRequest = {
    claim: edi.post.id,
    hash: "",
    kind: "stake",
    lifecycle: "onchain",
    meta: "",
    option: String(edi.getOption()),
    value: edi.getAmount().num.toString(),
  };

  const [res] = await VoteCreate(use.token, [req]);

  edi.updateVote(res);
};
