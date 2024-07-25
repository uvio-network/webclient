import * as Base from "@/components/icon/base/icon";

interface Props {
  className?: string;
  overwrite?: boolean;
}

export const XMarkIcon = (props: Props) => {
  return (
    <Base.Icon
      className={props.className}
      overwrite={props.overwrite}
    >
      <g>
        <path fill="currentColor" clipRule="evenodd" fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" />
      </g>
    </Base.Icon>
  );
};
