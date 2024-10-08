import { BaseIcon } from "@/components/icon/BaseIcon";

interface Props {
  className?: string;
  size?: string;
}

// https://fonts.google.com/icons?selected=Material+Symbols+Outlined:refresh:FILL@0;wght@500;GRAD@0;opsz@24&icon.query=refresh&icon.size=24&icon.color=%235f6368&icon.style=Outlined
export const RefreshIcon = (props: Props) => {
  return (
    <BaseIcon
      className={props.className}
      size={props.size}
      viewBox="0 -960 960 960"
    >
      <g>
        <path fill="currentColor" d="M479.04-151.87q-137.11 0-232.62-95.51-95.51-95.51-95.51-232.62t95.51-232.62q95.51-95.51 232.62-95.51 71.16 0 135.71 29.22 64.55 29.21 110.51 83.89v-113.11h83.83v291.72H517.13V-600H683.7q-32-54.57-86.43-85.85-54.42-31.28-118.23-31.28-98.8 0-167.96 69.16Q241.91-578.8 241.91-480t69.17 167.97q69.16 69.16 167.96 69.16 75.57 0 136.73-43.28T702.17-400h95.24q-28.24 109.35-116.63 178.74-88.39 69.39-201.74 69.39Z" />
      </g>
    </BaseIcon>
  );
};
