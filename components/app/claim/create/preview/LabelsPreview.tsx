import * as Category from "@/components/label/category";
import * as Lifecycle from "@/components/label/lifecycle";

import { EditorStore } from "@/components/app/claim/create/store/EditorStore";

export const LabelsPreview = () => {
  return (
    <div className="flex">
      <Lifecycle.ProposeLabel />
      {splLab(EditorStore.getState().editor.labels).map((x, i) => (
        <Category.CategoryLabel key={i} text={x} />
      ))}
    </div>
  );
};

// splLab takes a comma separated string and returns a string array contain its
// comma separated words.
//
//     "foo, bar  , baz  , hello world, duh  "
//
//     ["foo", "bar", "baz", "hello world", "duh"]
//
const splLab = (inp: string): string[] => {
  if (!inp || inp === "") return [];
  return inp.split(',').map(word => word.trim());
};
