"use client";

import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

import * as React from "react";

import { allowedElements } from "@/app/claim/create/allowedElements";
import { components } from "@/app/claim/create/components";
import { EditorButton } from "@/app/claim/create/EditorButton";
import { Formik, Form, Field } from "formik";

export default function Page() {
  const [edit, setEdit] = React.useState<boolean>(true);

  return (
    <>
      <div className="flex mb-6 w-full items-center">
        <EditorButton
          active={edit}
          onClick={() => setEdit((old) => !old)}
          text="Write"
        />
        <EditorButton
          active={!edit}
          onClick={() => setEdit((old) => !old)}
          text="Preview"
        />
      </div>

      <Formik
        initialValues={{ markdown: "" }}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({ values }) => (
          <Form>
            {edit && (
              <Field
                as="textarea"
                className="block w-full min-h-96 bg-white dark:bg-black outline-none"
                name="markdown"
                placeholder="# Title"
              />
            )}

            {!edit && (
              <Markdown
                allowedElements={allowedElements}
                className="w-full min-h-96"
                components={components}
                remarkPlugins={[remarkGfm]}
                skipHtml={true}
              >
                {values.markdown}
              </Markdown>
            )}

            <button type="submit">
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};
