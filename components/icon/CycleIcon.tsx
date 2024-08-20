import { BaseIcon } from "@/components/icon/BaseIcon";

interface Props {
  className?: string;
  size?: string;
}

// https://fonts.google.com/icons?selected=Material+Symbols+Outlined:history:FILL@0;wght@500;GRAD@0;opsz@24&icon.query=fresh&icon.size=24&icon.color=%235f6368&icon.style=Outlined
export const CycleIcon = (props: Props) => {
  return (
    <BaseIcon
      className={props.className}
      size={props.size}
      viewBox="0 -960 960 960"
    >
      <g>
        <path fill="currentColor" d="M479.52-111.87q-141.35 0-246.24-93.77Q128.39-299.41 113.63-440h92.76q14.24 102.8 91.78 169.97 77.55 67.16 181.35 67.16 115.81 0 196.47-80.66Q756.65-364.2 756.65-480t-80.66-196.47q-80.66-80.66-196.47-80.66-66.13 0-124.22 29.97-58.08 29.96-98.37 83.09h103.31V-560H113.78v-245.98h83.59v90.41q52.2-63.52 125.93-98.04 73.74-34.52 156.22-34.52 76.44 0 143.49 29.1 67.06 29.1 116.75 78.79 49.7 49.7 78.79 116.75 29.1 67.06 29.1 143.49t-29.1 143.49q-29.09 67.05-78.79 116.75-49.69 49.69-116.75 78.79-67.05 29.1-143.49 29.1Zm110.81-198.22-152-152V-680h83.58v184L649.2-368.96l-58.87 58.87Z" />
      </g>
    </BaseIcon>
  );
};
