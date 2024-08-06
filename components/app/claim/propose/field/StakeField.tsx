import * as React from "react";

import { EditorStore } from "@/components/app/claim/propose/editor/EditorStore";

export const StakeField = () => {
  const editor = EditorStore.getState();

  return (
    <div className="basis-1/4" >
      <input
        className="block mr-2 w-full bg-white dark:bg-black outline-none"
        defaultValue={editor.stake}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          editor.updateStake(e.currentTarget.value);
        }}
        placeholder="0.003 ETH"
        type="text"
      />
    </div>
  );
};
