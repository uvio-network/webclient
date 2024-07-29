import * as React from "react";

import { EditorStore } from "@/components/app/claim/propose/store/EditorStore";

export const LabelsField = () => {
  return (
    <input
      className="block w-full bg-white dark:bg-black outline-none"
      defaultValue={EditorStore.getState().editor.labels}
      name="labels"
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        EditorStore.getState().updateLabels(e.currentTarget.value);
      }}
      placeholder="crypto, economics, sports"
      type="text"
    />
  );
};
