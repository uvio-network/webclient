import * as React from "react";
import * as Select from '@radix-ui/react-select';

import { ChevronDownIcon } from "@/components/icon/ChevronDownIcon";
import { ChevronUpIcon } from "@/components/icon/ChevronUpIcon";
import { SelectItem } from "@/components/select/SelectItem";

export interface SelectItem {
  key: string;
  val: React.ReactElement;
}

interface Props {
  onSelect: (key: string) => void;
  selected: SelectItem;
  values: SelectItem[];
}

export const SelectBox = (props: Props) => {
  return (
    <Select.Root
      defaultValue={props.selected.key}
      disabled={props.values.length <= 1}
      onValueChange={(key: string) => {
        props.onSelect(key);
      }}
    >
      <Select.Trigger
        className={`
          w-full h-full rounded leading-none outline-none
          data-[placeholder]:text-gray-400
          dark:data-[placeholder]:text-gray-500
        `}
      >
        <Select.Value placeholder={<>{props.selected.val}</>} >
          {props.selected.val}
        </Select.Value>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content
          align="start"
          alignOffset={-8}
          collisionPadding={0}
          position="popper"
          side="top"
          sideOffset={8}
          className="max-h-72 background border border-color rounded"
        >

          <Select.ScrollUpButton className="p-2 flex background-overlay rounded-t items-center justify-center">
            <ChevronUpIcon />
          </Select.ScrollUpButton>

          <Select.Viewport className="">
            {props.values.map((x: SelectItem, i: number) => (
              <SelectItem key={x.key} value={x.key}>
                {x.val && React.cloneElement(x.val, {})}
              </SelectItem>
            ))}
          </Select.Viewport>

          <Select.ScrollDownButton className="p-2 flex background-overlay rounded-b items-center justify-center">
            <ChevronDownIcon />
          </Select.ScrollDownButton>

        </Select.Content>
      </Select.Portal>
    </Select.Root >
  );
};
