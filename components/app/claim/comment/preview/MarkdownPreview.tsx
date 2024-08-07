import { EditorStore } from "@/components/app/claim/comment/editor/EditorStore";
import { RenderMarkdown } from "@/components/markdown/RenderMarkdown";

export const MarkdownPreview = () => {
  const editor = EditorStore.getState();

  return (
    <div className="w-full min-h-96">
      <RenderMarkdown
        markdown={editor.markdown}
      />
    </div>
  );
};
