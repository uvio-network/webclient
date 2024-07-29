import { EditorStore } from "@/components/app/claim/propose/store/EditorStore";
import { RenderMarkdown } from "@/components/markdown/RenderMarkdown";

export const MarkdownPreview = () => {
  return (
    <div className="w-full min-h-96">
      <RenderMarkdown
        text={EditorStore.getState().editor.markdown}
      />
    </div>
  );
};
