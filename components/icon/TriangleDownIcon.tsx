import { BaseIcon } from "@/components/icon/BaseIcon";

interface Props {
  className?: string;
  size?: string;
}

// https://fonts.google.com/icons?selected=Material+Symbols+Rounded:change_history:FILL@0;wght@400;GRAD@0;opsz@24&icon.style=Rounded&icon.query=triangle&icon.size=24&icon.color=%235f6368
export const TriangleDownIcon = (props: Props) => {
  return (
    <BaseIcon
      className={props.className}
      size={props.size}
      viewBox="0 -960 960 960"
    >
      {/*
      Note that the original triangle icon from Google Fonts is rotated here by
      180 degrees.
      */}
      <g transform="rotate(180, 480, -480)">
        <path fill="currentColor" d="M152-160q-23 0-35-20.5t1-40.5l328-525q12-19 34-19t34 19l328 525q13 20 1 40.5T808-160H152Zm72-80h512L480-650 224-240Zm256-205Z" />
      </g>
    </BaseIcon>
  );
};
