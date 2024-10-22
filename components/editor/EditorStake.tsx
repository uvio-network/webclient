import * as React from "react";

import { EditorStore } from "@/modules/editor/EditorStore";
import { useShallow } from "zustand/react/shallow";

interface Props {
  disabled: boolean;
}

export const EditorStake = (props: Props) => {
  const { stake, propose } = EditorStore(useShallow((state) => ({
    propose: state.propose,
    stake: state.stake,
  })));

  React.useEffect(() => {
    if (propose && props.disabled) {
      const amo = propose.summary().post.minimum * 2; // disputes require 2x the minimum of the disputed propose
      const tok = propose.token();
      const pre = propose.precision();

      EditorStore.getState().updateStake(`${amo.toFixed(pre)} ${tok}`);
    }
  }, [propose, props.disabled]);

  return (
    <input
      className="block w-full mr-2 p-2 py-1 background placeholder outline-none disabled:cursor-not-allowed"
      disabled={props.disabled}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        EditorStore.getState().updateStake(e.currentTarget.value);
      }}
      placeholder={stake || "10.00 UVX"}
      type="text"
    />
  );
};
