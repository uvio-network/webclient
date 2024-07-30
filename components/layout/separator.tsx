import * as Separator from "@radix-ui/react-separator";

export const Horizontal = () => {
  return (
    <Separator.Root
      className="my-4 border-t-[1px] border-color data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px"
      decorative
      orientation="horizontal"
    />
  );
};

export const Vertical = () => {
  return (
    <Separator.Root
      className="mx-auto border-r-[1px] border-color border-dashed data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px"
      decorative
      orientation="vertical"
    />
  );
};
