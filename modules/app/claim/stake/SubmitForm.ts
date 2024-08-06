import * as ToastSender from "@/components/toast/ToastSender";

import { AuthMessage } from "@/components/auth/AuthStore";
import { AuthStore } from "@/components/auth/AuthStore";
import { EditorMessage } from "@/components/app/claim/stake/editor/EditorStore";
import { EditorStore } from "@/components/app/claim/stake/editor/EditorStore";
import { VoteCreate } from "@/modules/api/vote/create/Create";
import { VoteCreateRequest } from "@/modules/api/vote/create/Request";
import { VoteCreateResponse } from "@/modules/api/vote/create/Response";

// SubmitForm validates user input and then performs the vote creation.
export const SubmitForm = async (suc: (vot: string) => void) => {
  const { auth } = AuthStore.getState();
  const editor = EditorStore.getState();

  {
    if (!editor.value || editor.value === "") {
      return ToastSender.Error("The staking value must not be empty.");
    }
    if (!inpNum(editor.value)) {
      return ToastSender.Error("The amount of staked reputation must be a positive number.");
    }
    if (parseFloat(editor.value) < editor.minimum) {
      return ToastSender.Error(`You must stake at least the minimum amount of ${editor.minimum} ${editor.token}.`);
    }
  }

  const vot = await votCre(auth, editor);

  {
    ToastSender.Success("Certified, you staked the shit out of that reputation!");
    editor.delete();
    suc(vot.id);
  }

  // TODO prevent duplicated submits
};

const regex = /^\d+(\.\d+)?/;

// inpNum returns true if the given input string has a numerical prefix. This
// prefix might be an integer or floating point number.
//
//     5
//     0.003
//
const inpNum = (inp: string): boolean => {
  if (!inp || inp === "") return false;
  return regex.test(inp);
};

const votCre = async (aut: AuthMessage, edi: EditorMessage): Promise<VoteCreateResponse> => {
  const req: VoteCreateRequest = {
    claim: edi.claim,
    kind: "stake",
    option: edi.option,
    value: edi.value,
  };

  try {
    const [res] = await VoteCreate(aut.token, [req]);
    return res;
  } catch (err) {
    console.error(err);
    ToastSender.Error(err instanceof Error ? err.message : String(err));
    return Promise.reject(err);
  }
}
