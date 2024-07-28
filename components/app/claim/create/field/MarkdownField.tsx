import * as React from "react";

import { EditorStore } from "@/components/app/claim/create/store/EditorStore";

export const MarkdownField = () => {
  return (
    <textarea
      className="block w-full min-h-96 bg-white dark:bg-black outline-none"
      defaultValue={EditorStore.getState().editor.markdown}
      name="markdown"
      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
        EditorStore.getState().updateMarkdown(e.currentTarget.value);
      }}
      placeholder="# Title"
    />
  );
};
