import * as Separator from "@radix-ui/react-separator";

import { TrimWhitespace } from "@/modules/string/TrimWhitespace";

export const VerticalSeparator = () => {
  return (
    <Separator.Root
      className={TrimWhitespace(`
        mx-auto border-r-[1px] border-color border-dashed
        data-[orientation=horizontal]:h-px
        data-[orientation=horizontal]:w-full
        data-[orientation=vertical]:h-full
        data-[orientation=vertical]:w-px
      `)}
      decorative
      orientation="vertical"
    />
  );
};
