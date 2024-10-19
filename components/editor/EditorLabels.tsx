import * as React from "react";

import { EditorStore } from "@/modules/editor/EditorStore";
import { LabelList } from "@/components/label/LabelList";
import { SplitList } from "@/modules/string/SplitList";

interface Props {
  write: boolean;
}

export const EditorLabels = (props: Props) => {
  const editor = EditorStore.getState();

  if (props.write) {
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

  return (
    <div className="flex h-8">
      <div className="my-auto">
        <LabelList
          comment={false}
          labels={SplitList(editor.labels).map((str) => str.toLowerCase().replace(/\s+/g, "-"))}
          lifecycle="propose"
          pending={false}
          target="_blank"
          valid={false}
        />
      </div>
    </div>
  );
};
