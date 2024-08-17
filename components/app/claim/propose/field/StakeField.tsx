import * as React from "react";

import { EditorStore } from "@/components/app/claim/propose/editor/EditorStore";

export const StakeField = () => {
  const editor = EditorStore.getState();

  return (
    <input
      className="block w-full mr-2 p-2 py-1 background placeholder outline-none"
      defaultValue={editor.stake}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        editor.updateStake(e.currentTarget.value);
      }}
      placeholder="10 UVX"
      type="text"
    />
  );
};
