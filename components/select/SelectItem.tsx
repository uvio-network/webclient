import * as React from "react";
import * as Select from '@radix-ui/react-select';

import { CheckMarkIcon } from "@/components/icon/CheckMarkIcon";
import { TrimWhitespace } from "@/modules/string/TrimWhitespace";

interface Props {
  children: React.ReactNode;
  disabled: boolean;
  value: string;
}

export const SelectItem = React.forwardRef<HTMLDivElement, Props>(function SelectItem(props: Props, ref) {
  return (
    <Select.Item
      className={TrimWhitespace(`
        flex min-w-[110px] p-2
        outline-none cursor-pointer
        data-[disabled]:text-gray-400 data-[disabled]:dark:text-gray-500
        data-[highlighted]:bg-gray-200 dark:data-[highlighted]:bg-gray-700
      `)}
      disabled={props.disabled}
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
