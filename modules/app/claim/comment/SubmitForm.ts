import * as ToastSender from "@/components/toast/ToastSender";

import { EditorMessage } from "@/components/app/claim/comment/editor/EditorStore";
import { EditorStore } from "@/components/app/claim/comment/editor/EditorStore";
import { PostCreate } from "@/modules/api/post/create/Create";
import { PostCreateRequest } from "@/modules/api/post/create/Request";
import { PostCreateResponse } from "@/modules/api/post/create/Response";
import { UserMessage } from "@/modules/user/UserStore";
import { UserStore } from "@/modules/user/UserStore";

// SubmitForm validates user input and then performs the comment creation.
export const SubmitForm = async (suc: (cla: string, com: string) => void) => {
  const user = UserStore.getState().user;
  const editor = EditorStore.getState();

  {
    if (!editor.markdown || editor.markdown === "") {
      return ToastSender.Error("The provided markdown must not be empty.");
    }
    if (editor.markdown.length <= 100) {
      return ToastSender.Error("The provided markdown must at least have 100 characters.");
    }
    if (editor.markdown.length >= 5000) {
      return ToastSender.Error("The provided markdown must not be longer than 5000 characters.");
    }
  }

  const com = await posCre(user, editor);

  {
    ToastSender.Success("Best comment ever, mi amor!");
    editor.delete();
    suc(editor.claim, com.id);
  }

  // TODO prevent duplicated submits
};

const posCre = async (use: UserMessage, edi: EditorMessage): Promise<PostCreateResponse> => {
  const req: PostCreateRequest = {
    chain: "",
    hash: "",
    expiry: "",
    kind: "comment",
    labels: "",
    lifecycle: "",
    meta: "",
    parent: edi.claim,
    text: edi.markdown,
    token: "",
  };

  try {
    const [res] = await PostCreate(use.token, [req]);
    return res;
  } catch (err) {
    console.error(err);
    ToastSender.Error(err instanceof Error ? err.message : String(err));
    return Promise.reject(err);
  }
}
