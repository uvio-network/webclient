import { BaseIcon } from "@/components/icon/BaseIcon";

interface Props {
  className?: string;
  size?: string;
}

// https://fonts.google.com/icons?selected=Material+Symbols+Rounded:contrast:FILL@0;wght@500;GRAD@0;opsz@24&icon.query=theme&icon.size=24&icon.color=%235f6368&icon.style=Rounded
export const ThemeSystemIcon = (props: Props) => {
  return (
    <BaseIcon
      className={props.className}
      size={props.size}
      viewBox="0 -960 960 960"
    >
      <g>
        <path fill="currentColor" d="M479.98-71.87q-84.65 0-159.09-32.1-74.43-32.1-129.63-87.29-55.19-55.2-87.29-129.65-32.1-74.46-32.1-159.11 0-84.65 32.1-159.09 32.1-74.43 87.29-129.63 55.2-55.19 129.65-87.29 74.46-32.1 159.11-32.1 84.65 0 159.09 32.1 74.43 32.1 129.63 87.29 55.19 55.2 87.29 129.65 32.1 74.46 32.1 159.11 0 84.65-32.1 159.09-32.1 74.43-87.29 129.63-55.2 55.19-129.65 87.29-74.46 32.1-159.11 32.1Zm42.89-94.48q117.09-15.95 195.67-103.9Q797.13-358.2 797.13-480q0-121.15-78.59-209.3-78.58-88.16-195.67-104.11v627.06Z" />
      </g>
    </BaseIcon>
  );
};
