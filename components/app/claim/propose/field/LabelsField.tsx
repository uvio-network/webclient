import * as React from "react";

import { EditorStore } from "@/components/app/claim/propose/editor/EditorStore";

export const LabelsField = () => {
  const editor = EditorStore.getState();

  return (
    <input
      className="block w-full bg-white dark:bg-black outline-none"
      defaultValue={editor.labels}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        editor.updateLabels(e.currentTarget.value);
      }}
      placeholder="crypto, economics, sports"
      type="text"
    />
  );
};
