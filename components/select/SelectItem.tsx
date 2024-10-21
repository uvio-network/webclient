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
        flex min-w-[110px] p-2
        outline-none cursor-pointer
        data-[highlighted]:bg-gray-200
        dark:data-[highlighted]:bg-gray-700
      `}
      value={props.value}
      ref={ref}
    >
      <Select.ItemIndicator className="absolute right-2">
        <CheckMarkIcon />
      </Select.ItemIndicator>

      <Select.ItemText>{props.children}</Select.ItemText>
    </Select.Item>
  );
});
