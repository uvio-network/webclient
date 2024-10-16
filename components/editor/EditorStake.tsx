import * as React from "react";

import { ChainStore } from "@/modules/chain/ChainStore";
import { EditorStore } from "@/modules/editor/EditorStore";
import { useShallow } from "zustand/react/shallow";

interface Props {
  disabled: boolean;
}

export const EditorStake = (props: Props) => {
  const [stake, setStake] = React.useState<string>("10.00 UVX");

  const { propose } = EditorStore(useShallow((state) => ({
    propose: state.propose,
  })));

  React.useEffect(() => {
    if (propose && props.disabled) {
      const chain = ChainStore.getState().getActive();

      const amo = propose.summary().post.minimum * 2; // disputes require 2x the minimum of the disputed propose
      const tok = propose.token();
      const pre = chain.tokens[tok]?.precision || 2;

      setStake(`${amo.toFixed(pre)} ${tok}`);
    } else {
      setStake("10.00 UVX");
    }
  }, [propose, props.disabled]);

  return (
    <input
      className="block w-full mr-2 p-2 py-1 background placeholder outline-none disabled:cursor-not-allowed"
      disabled={props.disabled}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        EditorStore.getState().updateStake(e.currentTarget.value);
      }}
      placeholder={stake}
      type="text"
    />
  );
};
