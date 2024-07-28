import moment from "moment";

import * as ToastSender from "@/components/toast/ToastSender";

import { EditorStore } from "@/components/app/claim/create/store/EditorStore";
import { SplitList } from "@/modules/string/SplitList";
import { TimeFormat } from "@/modules/app/claim/create/TimeFormat";

// SubmitForm validates user input and then performs the claim creation.
export const SubmitForm = () => {
  const state = EditorStore.getState().editor;

  // Note that the order of the validation blocks below accomodates the user
  // experience when validating user input in the claim editor. The order of the
  // blocks below corresponds with the order of input fields on the claim create
  // page.

  {
    if (!state.markdown || state.markdown === "") {
      return ToastSender.Error("The provided markdown must not be empty.");
    }
    if (state.markdown.length <= 100) {
      return ToastSender.Error("The provided markdown must at least have 100 characters.");
    }
    if (state.markdown.length >= 2500) {
      return ToastSender.Error("The provided markdown must not be longer than 2500 characters.");
    }
  }

  {
    if (!state.labels || state.labels === "") {
      return ToastSender.Error("The proposed claim must have at least one category label.");
    }
    if (SplitList(state.labels).length > 4) {
      return ToastSender.Error("The proposed claim must not have more than four category labels.");
    }
  }

  {
    if (!state.expiry || state.expiry === "") {
      return ToastSender.Error("The provided expiry must not be empty.");
    }
    if (!moment(state.expiry, TimeFormat, true).isValid()) {
      return ToastSender.Error(`The provided expiry must be in the format ${TimeFormat}.`);
    }
  }

  {
    if (!state.stake || state.stake === "") {
      return ToastSender.Error("You must stake a minimum amount of reputation with your claim.");
    }
    if (!inpNum(state.stake)) {
      return ToastSender.Error("The amount of staked reputation must be positive.");
    }
    if (!inpTok(state.stake)) {
      return ToastSender.Error("The amount of staked reputation must be denominated in a whitelisted token.");
    }
  }

  // TODO
  console.log(1, state)
};

const regex = /^\d+(\.\d+)? \S+$/;

// inpNum returns true if the given input string has a numerical prefix. The
// implication here is that the input string must have only one whitespace
// separating prefix and suffix.
//
//     "0.003 ETH"
//
const inpNum = (inp: string): boolean => {
  if (!inp || inp === "") return false;
  if (inp.split(" ").length !== 2) return false;
  return regex.test(inp);
};

// inpTok returns true if the given input string has one of the following
// suffixes. The implication here is that the input string must have only one
// whitespace separating prefix and suffix.
//
//     ETH
//     USDC
//
const inpTok = (inp: string): boolean => {
  if (!inp || inp === "") return false;
  if (inp.split(" ").length !== 2) return false;
  return inp.endsWith("ETH") || inp.endsWith("USDC");
};
