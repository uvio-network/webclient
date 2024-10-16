import * as ToastSender from "@/components/toast/ToastSender";

import { EditorStore } from "@/modules/editor/EditorStore";

export const ValidateMarkdown = (): boolean => {
  const editor = EditorStore.getState();

  {
    if (!editor.markdown || editor.markdown === "") {
      return ToastSender.Error("The provided markdown must not be empty.");
    }
    if (editor.markdown.length < 20) {
      return ToastSender.Error("The provided markdown must at least have 20 characters.");
    }
    if (editor.markdown.length > 5000) {
      return ToastSender.Error("The provided markdown must not be longer than 5000 characters.");
    }
  }

  return true;
};
