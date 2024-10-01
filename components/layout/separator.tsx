import * as Separator from "@radix-ui/react-separator";

interface Props {
  margin?: string;
  progress?: number;
}

export const Horizontal = (props: Props) => {
  return (
    <>
      {props.progress !== undefined && props.progress >= 0 && props.progress <= 100 ? (
        <div className="relative w-full">
          <Separator.Root
            className={`
              border-t-[1px] border-color
              ${props.margin ? props.margin : "my-4"}
              data-[orientation=horizontal]:h-px
              data-[orientation=horizontal]:w-full
            `}
            decorative
            orientation="horizontal"
          />
          <div
            className="absolute top-0 right-0 h-full"
            style={{ width: `${100 - props.progress}%` }}
          >
            <Separator.Root
              className={`
                border-t-[1px] border-blue-400
                data-[orientation=horizontal]:h-px
                data-[orientation=horizontal]:w-full
              `}
              decorative
              orientation="horizontal"
            />
          </div>
        </div >
      ) : (
        <Separator.Root
          className={`
            border-t-[1px] border-color
            ${props.margin ? props.margin : "my-4"}
            data-[orientation=horizontal]:h-px
            data-[orientation=horizontal]:w-full
          `}
          decorative
          orientation="horizontal"
        />
      )}
    </>
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
