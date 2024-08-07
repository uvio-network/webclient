import * as React from "react";

import { EditorStore } from "@/components/app/claim/comment/editor/EditorStore";

export const MarkdownField = () => {
  const editor = EditorStore.getState();

  return (
    <textarea
      className="block w-full min-h-96 bg-white dark:bg-black outline-none"
      defaultValue={editor.markdown}
      name="markdown"
      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
        editor.updateMarkdown(e.currentTarget.value);
      }}
      placeholder="# Title"
    />
  );
};
