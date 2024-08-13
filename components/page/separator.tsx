import * as Separator from "@radix-ui/react-separator";

interface Props {
  highlight: boolean;
}

export const Horizontal = (props: Props) => {
  return (
    <Separator.Root
      className={`
        ${props.highlight ? "border-blue-400 dark:border-blue-400" : "border-white dark:border-black"}
        mt-4 border-b-[1px] data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px
      `}
      decorative
      orientation="horizontal"
    />
  );
};
