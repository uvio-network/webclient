import { EditorStore } from "@/components/app/claim/propose/store/EditorStore";
import { SplitList } from "@/modules/string/SplitList";
import { LabelList } from "@/components/claim/LabelList";

export const LabelsPreview = () => {
  return (
    <LabelList
      labels={SplitList(EditorStore.getState().editor.labels)}
      lifecycle="propose"
    />
  );
};
