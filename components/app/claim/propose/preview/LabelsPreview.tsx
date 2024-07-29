import { EditorStore } from "@/components/app/claim/propose/store/EditorStore";
import { LabelList } from "@/components/claim/LabelList";
import { SplitList } from "@/modules/string/SplitList";

export const LabelsPreview = () => {
  return (
    <LabelList
      labels={SplitList(EditorStore.getState().editor.labels)}
      lifecycle="propose"
    />
  );
};
