import moment from "moment";

import * as ToastSender from "@/components/toast/ToastSender";

import { EditorStore } from "@/modules/editor/EditorStore";

export const ValidateExpiry = (): boolean => {
  const edi = EditorStore.getState();
  const uni: number = edi.getExpiry()

  {
    if (!edi.day || edi.day === "") {
      return ToastSender.Error("You must select a day for the claim expiry.");
    }
    if (!edi.month || edi.month === "") {
      return ToastSender.Error("You must select a month for the claim expiry.");
    }
    if (!edi.year || edi.year === "") {
      return ToastSender.Error("You must select a year for the claim expiry.");
    }
    if (moment.unix(uni).isBefore(moment().utc())) {
      return ToastSender.Error("The selected expiry must not be in past.");
    }
  }

  // If the propose is empty, or pending, then that means we are creating a
  // propose in the propose editor. If a proper propose exists on the other
  // hand, then that means we are creating a dispute in the dispute editor.
  if (edi.propose === undefined || edi.propose.pending()) {
    if (moment.unix(uni).isBefore(moment().utc().add(1, "day"))) {
      return ToastSender.Error("The selected expiry must be at least 1 day in the future.");
    }
  } else {
    if (moment.unix(uni).isBefore(moment().utc().add(3, "day"))) {
      return ToastSender.Error("The selected expiry must be at least 3 days in the future.");
    }
    if (moment.unix(uni).isAfter(moment().utc().add(30, "day"))) {
      // TODO if the user selects the max expiry then we need to adjust for
      // latency and remove a couple of seconds for the onchain settlement to be
      // buffered.
      return ToastSender.Error("The selected expiry must be within the next 30 days.");
    }
  }

  return true;
};
