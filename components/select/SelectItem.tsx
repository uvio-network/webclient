import * as React from "react";
import * as Select from '@radix-ui/react-select';

import { CheckMarkIcon } from "@/components/icon/CheckMarkIcon";

interface Props {
  children: React.ReactNode;
  value: string;
}

export const SelectItem = React.forwardRef<HTMLDivElement, Props>(function SelectItem(props: Props, ref) {
  return (
    <Select.Item
      className={`
        flex w-[150px] p-2
        rounded outline-none cursor-pointer
        items-center justify-center
        data-[highlighted]:bg-gray-200
        dark:data-[highlighted]:bg-gray-700
      `}
      value={props.value}
      ref={ref}
    >

      <Select.ItemIndicator className="absolute left-0 ml-2">
        <CheckMarkIcon className="ml-2" />
      </Select.ItemIndicator>

      <Select.ItemText>{props.children}</Select.ItemText>

    </Select.Item>
  );
});
