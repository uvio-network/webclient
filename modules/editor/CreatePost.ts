import { ChainStore } from "@/modules/chain/ChainStore";
import { EditorStore } from "@/modules/editor/EditorStore";
import { EmptyPostCreateRequest } from "@/modules/api/post/create/Request";
import { PostCreate } from "@/modules/api/post/create/Create";
import { UserStore } from "@/modules/user/UserStore";

export const CreatePost = async () => {
  const chn = ChainStore.getState().getActive();
  const edi = EditorStore.getState();
  const use = UserStore.getState();

  // If a pending claim exists, then we do not have to create one.
  if (edi.post !== undefined && edi.post.id !== "") {
    console.log("Editor.CreatePost.return", edi.post.id);
    return;
  }

  const req = EmptyPostCreateRequest();

  if (edi.kind === "claim") {
    req.chain = chn.id.toString();
    req.contract = edi.claims.address.toString();
    req.expiry = edi.getExpiry().toString();
    req.kind = "claim";
    req.labels = edi.labels;
    req.lifecycle = edi.isDispute() ? "dispute" : "propose";
    req.parent = edi.isDispute() ? edi.resolve.id() : "";
    req.token = edi.getSymbol();
  }

  if (edi.kind === "comment") {
    req.kind = "comment";
    req.parent = edi.parent.id();
  }

  {
    req.text = edi.markdown;
  }

  const [res] = await PostCreate(use.token, [req]);

  edi.updatePost(res);
};
