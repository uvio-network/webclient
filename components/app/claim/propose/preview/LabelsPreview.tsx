import { EditorStore } from "@/components/app/claim/propose/editor/EditorStore";
import { LabelList } from "@/components/label/LabelList";
import { SplitList } from "@/modules/string/SplitList";

export const LabelsPreview = () => {
  const editor = EditorStore.getState();

  return (
    <div className="flex h-8">
      <div className="my-auto">
        <LabelList
          comment={false}
          labels={SplitList(editor.labels).map((str) => str.toLowerCase().replace(/\s+/g, "-"))}
          lifecycle="propose"
          pending={false}
          target="_blank"
        />
      </div>
    </div>
  );
};
