import * as React from "react";

import { EditorStore } from "@/components/app/claim/propose/editor/EditorStore";

export const MarkdownField = () => {
  const editor = EditorStore.getState();

  return (
    <textarea
      className="block w-full min-h-96 background placeholder outline-none"
      defaultValue={editor.markdown}
      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
        editor.updateMarkdown(e.currentTarget.value);
      }}
      placeholder="### Title"
    />
  );
};
