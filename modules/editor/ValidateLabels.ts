import * as ToastSender from "@/components/toast/ToastSender";

import { EditorStore } from "@/modules/editor/EditorStore";
import { HasDuplicate } from "@/modules/string/HasDuplicate";
import { SplitList } from "@/modules/string/SplitList";

export const ValidateLabels = (): boolean => {
  const editor = EditorStore.getState();

  {
    const exp = /^[a-zA-Z0-9-\s]+$/;
    const lis = SplitList(editor.getLabels());

    if (!lis.every((x) => exp.test(x))) {
      return ToastSender.Error("Labels must be alpha numerical.");
    }
    if (!editor.labels || editor.labels === "") {
      return ToastSender.Error("Please provide at least 1 category label.");
    }
    if (lis.length > 4) {
      return ToastSender.Error("There must not be more than 4 category labels.");
    }
    if (HasDuplicate(lis)) {
      return ToastSender.Error("There must not be duplicated category labels.");
    }
  }

  return true;
};
