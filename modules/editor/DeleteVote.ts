import { EditorStore } from "@/modules/editor/EditorStore";
import { EmptyVoteCreateResponse } from "@/modules/api/vote/create/Response";
import { UserStore } from "@/modules/user/UserStore";
import { VoteDelete } from "@/modules/api/vote/delete/Delete";
import { VoteDeleteRequest } from "@/modules/api/vote/delete/Request";

export const DeleteVote = async () => {
  const edi = EditorStore.getState();
  const use = UserStore.getState();

  const req: VoteDeleteRequest = {
    // intern
    id: edi.vote.id,
  };

  {
    await VoteDelete(use.token, [req]);
  }

  // Reset the deleted claim data.
  {
    edi.updateVote(EmptyVoteCreateResponse());
  }
};
