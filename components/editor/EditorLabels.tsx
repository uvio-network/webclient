import * as React from "react";

import { BaseLabel } from "@/components/label/BaseLabel";
import { EditorStore } from "@/modules/editor/EditorStore";
import { LabelList } from "@/components/label/LabelList";
import { SplitList } from "@/modules/string/SplitList";
import { LifecycleObject } from "@/modules/lifecycle/LifecycleObject";

interface Props {
  write: boolean;
}

export const EditorLabels = (props: Props) => {
  const edi = EditorStore.getState();

  if (props.write) {
    return (
      <input
        className="block w-full mr-2 p-2 py-1 background placeholder outline-none"
        defaultValue={edi.labels}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          edi.updateLabels(e.currentTarget.value);
        }}
        placeholder="crypto, economics, sports"
        type="text"
      />
    );
  };

  const lif = new LifecycleObject("propose:onchain", false);

  return (
    <div className="flex h-full py-[5px]">
      <BaseLabel
        className="cursor-default"
        color={lif.color()}
        dashed={lif.pending()}
        text={lif.phase()}
      />

      <LabelList
        labels={SplitList(edi.labels).map((str) => str.toLowerCase().replace(/\s+/g, "-"))}
        target="_blank"
      />
    </div>
  );
};
