import { EditorStore } from "@/modules/editor/EditorStore";
import { UserStore } from "@/modules/user/UserStore";
import { VoteUpdate } from "@/modules/api/vote/update/Update";
import { VoteUpdateRequest } from "@/modules/api/vote/update/Request";

export const UpdateVote = async () => {
  const edi = EditorStore.getState();
  const use = UserStore.getState().user;

  const req: VoteUpdateRequest = {
    // intern
    id: edi.vote.id,
    // public
    hash: edi.receipt.hash,
    meta: "",
  };

  await VoteUpdate(use.token, [req]);
};
