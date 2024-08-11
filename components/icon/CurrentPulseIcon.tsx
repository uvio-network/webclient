import { BaseIcon } from "@/components/icon/BaseIcon";

interface Props {
  className?: string;
  size?: string;
}

// https://fonts.google.com/icons?selected=Material+Symbols+Outlined:earthquake:FILL@0;wght@400;GRAD@0;opsz@24&icon.query=chart&icon.size=24&icon.color=%235f6368
export const CurrentPulseIcon = (props: Props) => {
  return (
    <BaseIcon
      className={props.className}
      size={props.size}
      viewBox="0 -960 960 960"
    >
      <g>
        <path fill="currentColor" d="M361-80q-14 0-24.5-7.5T322-108L220-440H80v-80h170q13 0 23.5 7.5T288-492l66 215 127-571q3-14 14-23t25-9q14 0 25 8.5t14 22.5l87 376 56-179q4-13 14.5-20.5T740-680q13 0 23 7t15 19l50 134h52v80h-80q-13 0-23-7t-15-19l-19-51-65 209q-4 13-15 21t-25 7q-14-1-24-9.5T601-311l-81-348-121 548q-3 14-13.5 22T361-80Z" />
      </g>
    </BaseIcon>
  );
};
