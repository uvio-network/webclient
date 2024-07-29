import * as Category from "@/components/label/category";
import * as Lifecycle from "@/components/label/lifecycle";

import { EditorStore } from "@/components/app/claim/propose/store/EditorStore";
import { SplitList } from "@/modules/string/SplitList";

export const LabelsPreview = () => {
  return (
    <div className="flex">
      <Lifecycle.ProposeLabel />
      {SplitList(EditorStore.getState().editor.labels).map((x, i) => (
        <Category.CategoryLabel key={i} text={x} />
      ))}
    </div>
  );
};
