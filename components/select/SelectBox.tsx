import * as Select from '@radix-ui/react-select';

import { ChevronDownIcon } from "@/components/icon/ChevronDownIcon";
import { ChevronUpIcon } from "@/components/icon/ChevronUpIcon";
import { SelectItem } from "@/components/select/SelectItem";

interface Props {
  onSelect: (val: string) => void;
  selected: string;
  values: string[];
}

export const SelectBox = (props: Props) => {
  return (
    <Select.Root
      onValueChange={props.onSelect}
    >
      <Select.Trigger
        className={`
          w-full p-2 rounded leading-none outline-none
          data-[placeholder]:text-gray-400
          dark:data-[placeholder]:text-gray-500
        `}
      >
        <Select.Value placeholder={props.selected} />
      </Select.Trigger>

      <Select.Portal>
        <Select.Content
          position="popper"
          align="center"
          side="top"
          sideOffset={5}
          className="h-72 background border border-color rounded"
        >

          <Select.ScrollUpButton className="p-2 flex background-overlay rounded-t items-center justify-center">
            <ChevronUpIcon />
          </Select.ScrollUpButton>

          <Select.Viewport className="p-2 ">
            {props.values.map((x: string, i: number) => (
              <SelectItem key={x} value={x}>{x}</SelectItem>
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
