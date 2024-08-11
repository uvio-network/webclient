import { BaseIcon } from "@/components/icon/BaseIcon";

interface Props {
  className?: string;
  size?: string;
}

// https://fonts.google.com/icons?selected=Material+Symbols+Rounded:dark_mode:FILL@0;wght@500;GRAD@0;opsz@24&icon.query=theme&icon.size=24&icon.color=%235f6368&icon.style=Rounded
export const ThemeDarkIcon = (props: Props) => {
  return (
    <BaseIcon
      className={props.className}
      size={props.size}
      viewBox="0 -960 960 960"
    >
      <g>
        <path fill="currentColor" d="M480.24-116.41q-153.63 0-258.73-104.98Q116.41-326.37 116.41-480q0-133.93 84.74-235.43t223.31-123.05q15.39-3.43 27.54 1.35 12.15 4.78 19.95 14.02 7.79 9.24 9.6 22.2 1.82 12.95-4.75 26.11-13.89 25.04-21.31 51.65-7.42 26.61-7.42 55.5 0 91.69 64.32 155.88 64.33 64.18 156.22 64.18 28.37 0 56.48-7.44 28.11-7.45 50.91-20.58 12.91-5.8 25.13-4.11 12.22 1.7 21.1 8.13 9.88 6.44 14.66 18.23 4.78 11.8 1.59 27.95Q820.17-291 717.63-203.71q-102.54 87.3-237.39 87.3Zm0-91q81.78 0 147.84-43.72 66.05-43.72 98.29-114.78-17.61 4.04-35.1 6.32-17.49 2.29-34.86 1.81-122.04-4.07-207.94-89.37-85.9-85.31-90.45-209.26-.24-17.37 1.93-34.98 2.16-17.61 6.44-34.98-70.82 32.48-114.78 98.65-43.96 66.18-43.96 147.72 0 112.93 79.83 192.76 79.83 79.83 192.76 79.83Zm-13.11-259.48Z" />
      </g>
    </BaseIcon>
  );
};
