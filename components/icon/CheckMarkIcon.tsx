import { BaseIcon } from "@/components/icon/BaseIcon";

interface Props {
  className?: string;
  size?: string;
}

// https://fonts.google.com/icons?selected=Material+Symbols+Outlined:content_copy:FILL@0;wght@500;GRAD@0;opsz@24&icon.query=copy&icon.size=24&icon.color=%235f6368
export const CheckMarkIcon = (props: Props) => {
  return (
    <BaseIcon
      className={props.className}
      size={props.size}
      viewBox="0 -960 960 960"
    >
      <g>
        <path fill="currentColor" d="M382-232.35 146.35-468l64.89-64.89L382-362.13l366.76-366.76L813.65-664 382-232.35Z" />
      </g>
    </BaseIcon>
  );
};
