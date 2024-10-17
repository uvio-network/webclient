import { EditorStore } from "@/modules/editor/EditorStore";
import { UserStore } from "@/modules/user/UserStore";
import { VoteCreate } from "@/modules/api/vote/create/Create";
import { EmptyVoteCreateRequest, VoteCreateRequest } from "@/modules/api/vote/create/Request";

export const CreateVote = async () => {
  const edi = EditorStore.getState();
  const use = UserStore.getState();

  // If a pending vote for a pending claim exists already, then we do not have
  // to create one.
  if (edi.vote.id !== "") {
    return;
  }

  const req = EmptyVoteCreateRequest();

  if (edi.kind === "claim" || edi.kind === "stake") {
    req.kind = "stake";
    req.value = edi.getAmount().num.toString();
  }

  if (edi.kind === "truth") {
    req.kind = "truth";
    req.value = "1";
  }

  {
    req.claim = edi.post.id;
    req.hash = "";
    req.lifecycle = "onchain";
    req.meta = "";
    req.option = String(edi.getOption());
  }

  const [res] = await VoteCreate(use.token, [req]);

  edi.updateVote(res);
};
