import * as React from "react";
import * as Form from "@radix-ui/react-form";

import { EditorStore } from "@/components/app/claim/create/store/EditorStore";

export const LabelsField = () => {
  return (
    <Form.Field className="" name="labels">
      <Form.Control asChild>
        <input
          className="block w-full bg-white dark:bg-black outline-none"
          defaultValue={EditorStore.getState().editor.labels}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            EditorStore.getState().updateLabels(e.currentTarget.value);
          }}
          placeholder="Labels"
          required={true}
          type="text"
        />
      </Form.Control>

      <Form.Message className="" match="valueMissing">
        The proposed claim must have at least one category label.
      </Form.Message>
    </Form.Field>
  );
};
