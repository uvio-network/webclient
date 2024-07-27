import moment from "moment";

import * as React from "react";
import * as Form from "@radix-ui/react-form";

import { TimeFormat } from "@/components/app/claim/create/editor/TimeFormat";

export const ExpiryField = () => {
  return (
    <Form.Field className="basis-3/4" name="expiry">
      <Form.Control asChild>
        <input
          defaultValue={moment(new Date()).format(TimeFormat)}
          className="block mr-2 w-full bg-white dark:bg-black outline-none"
          placeholder={TimeFormat}
          required={true}
          type="text"
        />
      </Form.Control>

      <Form.Message className="" match="valueMissing">
        The provided expiry must not be empty.
      </Form.Message>
      <Form.Message className="" match={(inp: string) => moment(inp, TimeFormat, true).isValid()}>
        The provided expiry must be in the format {TimeFormat}.
      </Form.Message>
    </Form.Field>
  );
};
