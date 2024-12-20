import { EditorStore } from "@/modules/editor/EditorStore";
import { PostUpdate } from "@/modules/api/post/update/Update";
import { PostUpdateRequest } from "@/modules/api/post/update/Request";
import { UserStore } from "@/modules/user/UserStore";

export const UpdatePost = async () => {
  const edi = EditorStore.getState();
  const use = UserStore.getState();

  const req: PostUpdateRequest = {
    // intern
    id: edi.post.id,
    // public
    hash: edi.receipt.hash.transaction,
    meta: "",
  };

  await PostUpdate(use.token, [req]);
};
