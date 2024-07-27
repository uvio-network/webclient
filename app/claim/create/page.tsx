"use client";

import * as Category from "@/components/label/category";
import * as React from "react";
import * as Lifecycle from "@/components/label/lifecycle";

import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { EditorElements } from "@/components/app/claim/create/editor/EditorElements";
import { EditorComponents } from "@/components/app/claim/create/editor/EditorComponents";
import { EditorButton } from "@/components/app/claim/create/editor/EditorButton";
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
        initialValues={{ labels: "", markdown: "" }}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({ values }) => (
          <Form>
            {edit && (
              <>
                <Field
                  as="textarea"
                  className="block w-full min-h-96 bg-white dark:bg-black outline-none"
                  name="markdown"
                  placeholder="# Title"
                />

                <Field
                  as="input"
                  type="text"
                  className="block w-full bg-white dark:bg-black outline-none"
                  name="labels"
                  placeholder="Labels"
                />
              </>
            )}

            {!edit && (
              <>
                <Markdown
                  allowedElements={EditorElements}
                  className="w-full min-h-96"
                  components={EditorComponents}
                  remarkPlugins={[remarkGfm]}
                  skipHtml={true}
                >
                  {values.markdown}
                </Markdown>

                <div className="flex">
                  <Lifecycle.ProposeLabel />
                  {splLab(values.labels).map((x, i) => (
                    <Category.CategoryLabel key={i} text={x} />
                  ))}
                </div>
              </>
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

// splLab takes a comma separated string and returns a string array contain its
// comma separated words.
//
//     "foo, bar  , baz  , hello world, duh  "
//
//     ["foo", "bar", "baz", "hello world", "duh"]
//
const splLab = (inp: string): string[] => {
  if (inp === "") return [];
  return inp.split(',').map(word => word.trim());
}
