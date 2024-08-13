import { BaseIcon } from "@/components/icon/BaseIcon";

interface Props {
  className?: string;
  size?: string;
}

// https://fonts.google.com/icons?selected=Material+Symbols+Rounded:check:FILL@0;wght@500;GRAD@0;opsz@24&icon.query=check&icon.size=24&icon.color=%235f6368&icon.style=Rounded
export const CheckMarkIcon = (props: Props) => {
  return (
    <BaseIcon
      className={props.className}
      size={props.size}
      viewBox="0 -960 960 960"
    >
      <g>
        <path fill="currentColor" d="m382-362.13 334.7-334.7q13.67-13.67 32.06-13.67t32.07 13.67q13.67 13.68 13.67 32.45 0 18.77-13.67 32.45L414.07-264.41q-13.68 13.67-32.07 13.67t-32.07-13.67L178.41-435.93q-13.67-13.68-13.29-32.45.38-18.77 14.05-32.45 13.68-13.67 32.45-13.67 18.77 0 32.45 13.67L382-362.13Z" />
      </g>
    </BaseIcon>
  );
};
