import * as React from "react";

import { EditorStore } from "@/components/app/claim/propose/editor/EditorStore";

export const LabelsField = () => {
  const editor = EditorStore.getState();

  return (
    <input
      className="block w-full mr-2 p-2 py-1 background placeholder outline-none"
      defaultValue={editor.labels}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        editor.updateLabels(e.currentTarget.value);
      }}
      placeholder="crypto, economics, sports"
      type="text"
    />
  );
};
