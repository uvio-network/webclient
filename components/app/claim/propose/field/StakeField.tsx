import * as React from "react";

import { EditorStore } from "@/components/app/claim/propose/store/EditorStore";

const defaultValue = "0.003 ETH";

export const StakeField = () => {
  return (
    <div className="basis-1/4" >
      <input
        className="block mr-2 w-full bg-white dark:bg-black outline-none"
        defaultValue={EditorStore.getState().editor.stake}
        name="stake"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          EditorStore.getState().updateStake(e.currentTarget.value);
        }}
        placeholder={defaultValue}
        type="text"
      />
    </div>
  );
};
