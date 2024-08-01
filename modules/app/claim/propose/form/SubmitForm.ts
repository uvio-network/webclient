import moment from "moment";

import * as ToastSender from "@/components/toast/ToastSender";

import { AuthStore } from "@/components/auth/AuthStore";
import { EditorStore } from "@/components/app/claim/propose/editor/EditorStore";
import { HasDuplicate } from "@/modules/string/HasDuplicate";
import { PostCreate } from "@/modules/api/post/create/Create";
import { PostCreateRequest } from "@/modules/api/post/create/Request";
import { SplitList } from "@/modules/string/SplitList";
import { TimeFormat } from "@/modules/app/claim/propose/TimeFormat";

// SubmitForm validates user input and then performs the claim creation.
export const SubmitForm = async (cb: (id: string) => void) => {
  const editor = EditorStore.getState();

  // Note that the order of the validation blocks below accomodates the user
  // experience when validating user input in the claim editor. The order of the
  // blocks below corresponds with the order of input fields on the claim create
  // page.

  {
    if (!editor.markdown || editor.markdown === "") {
      return ToastSender.Error("The provided markdown must not be empty.");
    }
    if (editor.markdown.length <= 100) {
      return ToastSender.Error("The provided markdown must at least have 100 characters.");
    }
    if (editor.markdown.length >= 2500) {
      return ToastSender.Error("The provided markdown must not be longer than 2500 characters.");
    }
  }

  // TODO limit character set for labels, make it alpha numerical
  {
    if (!editor.labels || editor.labels === "") {
      return ToastSender.Error("The proposed claim must have at least one category label.");
    }
    if (SplitList(editor.labels).length > 4) {
      return ToastSender.Error("The proposed claim must not have more than four category labels.");
    }
    if (HasDuplicate(SplitList(editor.labels))) {
      return ToastSender.Error("The proposed claim must not have duplicated category labels.");
    }
  }

  {
    if (!editor.expiry || editor.expiry === "") {
      return ToastSender.Error("The provided expiry must not be empty.");
    }
    if (!moment(editor.expiry, TimeFormat, true).isValid()) {
      return ToastSender.Error(`The provided expiry must be in the format ${TimeFormat}.`);
    }
    if (moment(editor.expiry, TimeFormat).isBefore(moment())) {
      return ToastSender.Error("The provided expiry must not be in past.");
    }
  }

  {
    if (!editor.stake || editor.stake === "") {
      return ToastSender.Error("You must stake a minimum amount of reputation with your claim.");
    }
    if (!inpPrt(editor.stake)) {
      return ToastSender.Error("The format for staked reputation must be [number token].");
    }
    if (!inpNum(editor.stake)) {
      return ToastSender.Error("The amount of staked reputation must be positive.");
    }
    if (!inpTok(editor.stake)) {
      return ToastSender.Error("The amount of staked reputation must be denominated in a whitelisted token.");
    }
  }

  const req: PostCreateRequest = {
    expiry: moment(editor.expiry, TimeFormat, true).unix().toString(),
    kind: "claim",
    labels: SplitList(editor.labels).join(","),
    lifecycle: "propose",
    option: "true",
    parent: "",
    stake: editor.stake.split(" ")[0],
    text: editor.markdown,
    token: editor.stake.split(" ")[1],
  };

  try {
    const [res] = await PostCreate(AuthStore.getState().auth.token, [req]);
    ToastSender.Success("Hooray, thy claim proposed milady!");
    editor.delete();
    cb(res.id);
  } catch (err) {
    ToastSender.Error("Oh snap, the beavers don't want you to tell the world right now!");
  }

  // TODO prevent duplicated submits
};

// inpPrt returns true if the given input is a two part string separated by a
// single whitespace. We use this to ensure we get user input like shown below.
//
//     "0.003 ETH"
//
const inpPrt = (inp: string): boolean => {
  return inp.split(" ").length === 2;
};

const regex = /^\d+(\.\d+)? \S+$/;

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

// inpTok returns true if the given input string has one of the following
// suffixes. Those ticker symbols define our token whitelist for proposing
// claims.
//
//     ETH
//     USDC
//
const inpTok = (inp: string): boolean => {
  if (!inp || inp === "") return false;
  return inp.endsWith("ETH") || inp.endsWith("USDC");
};
