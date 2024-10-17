import { EditorStore } from "@/modules/editor/EditorStore";
import { PostDelete } from "@/modules/api/post/delete/Delete";
import { PostDeleteRequest } from "@/modules/api/post/delete/Request";
import { UserStore } from "@/modules/user/UserStore";

export const DeletePost = async () => {
  const edi = EditorStore.getState();
  const use = UserStore.getState();

  const req: PostDeleteRequest = {
    // intern
    id: edi.post.id,
  };

  await PostDelete(use.token, [req]);
};
