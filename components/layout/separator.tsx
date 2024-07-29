import * as Separator from "@radix-ui/react-separator";

export const Horizontal = () => {
  return (
    <Separator.Root
      className="my-4 border-b-[1px] border-color data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px"
      decorative
      orientation="horizontal"
    />
  );
};
