import * as Separator from "@radix-ui/react-separator";

export const Horizontal = () => {
  return (
    <Separator.Root
      className="my-4 border-gray-300 dark:border-gray-600 border-b-[1px] data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px"
      decorative
      orientation="horizontal"
    />
  );
};
