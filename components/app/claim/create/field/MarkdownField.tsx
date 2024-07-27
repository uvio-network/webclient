import * as React from "react";
import * as Form from "@radix-ui/react-form";

import { EditorStore } from "@/components/app/claim/create/store/EditorStore";

export const MarkdownField = () => {
  return (
    <Form.Field className="" name="markdown">
      <Form.Control asChild>
        <textarea
          className="block w-full min-h-96 bg-white dark:bg-black outline-none"
          defaultValue={EditorStore.getState().editor.markdown}
          maxLength={2500}
          minLength={100}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
            EditorStore.getState().updateMarkdown(e.currentTarget.value);
          }}
          placeholder="# Title"
          required={true}
        />
      </Form.Control>

      <Form.Message className="" match="valueMissing">
        The provided markdown must not be empty.
      </Form.Message>
      <Form.Message className="" match="tooShort">
        The provided markdown must at least have 100 characters.
      </Form.Message>
      <Form.Message className="" match="tooLong">
        The provided markdown must not be longer than 2500 characters.
      </Form.Message>
    </Form.Field>
  );
};
