import * as Separator from "@radix-ui/react-separator";

interface Props {
  margin?: string;
}

export const Horizontal = (props: Props) => {
  return (
    <Separator.Root
      className={`
        border-t-[1px] border-color
        ${props.margin ? props.margin : "my-4"}
        data-[orientation=horizontal]:h-px
        data-[orientation=horizontal]:w-full
        data-[orientation=vertical]:h-full
        data-[orientation=vertical]:w-px
      `}
      decorative
      orientation="horizontal"
    />
  );
};

export const Vertical = (props: Props) => {
  return (
    <Separator.Root
      className="mx-auto border-r-[1px] border-color border-dashed data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px"
      decorative
      orientation="vertical"
    />
  );
};
