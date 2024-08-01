import { EditorStore } from "@/components/app/claim/propose/editor/EditorStore";
import { LabelList } from "@/components/claim/LabelList";
import { SplitList } from "@/modules/string/SplitList";

export const LabelsPreview = () => {
  const editor = EditorStore.getState();

  return (
    <LabelList
      labels={SplitList(editor.labels).map(str => str.toLowerCase())}
      lifecycle="propose"
      target="_blank"
    />
  );
};
