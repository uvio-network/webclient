import { EditorStore } from "@/modules/editor/EditorStore";
import { EmptyVoteCreateRequest } from "@/modules/api/vote/create/Request";
import { UserStore } from "@/modules/user/UserStore";
import { VoteCreate } from "@/modules/api/vote/create/Create";

export const CreateVote = async () => {
  const edi = EditorStore.getState();
  const use = UserStore.getState();

  // If a pending vote for a pending claim exists already, then we do not have
  // to create one.
  if (edi.vote !== undefined && edi.vote.id !== "") {
    console.log("Editor.CreateVote.exists", edi.vote.id);
    return;
  }

  const req = EmptyVoteCreateRequest();

  if (edi.kind === "claim") {
    req.kind = "stake";
    req.claim = edi.post.id;
    req.value = edi.getAmount().num.toString();
  }

  if (edi.kind === "stake") {
    req.kind = "stake";
    req.claim = edi.propose.id();
    req.value = edi.getAmount().num.toString();
  }

  if (edi.kind === "truth") {
    req.kind = "truth";
    req.claim = edi.resolve.id();
    req.value = "1";
  }

  {
    req.lifecycle = "onchain";
    req.option = String(edi.option);
  }

  const [res] = await VoteCreate(use.token, [req]);

  edi.updateVote(res);
};
