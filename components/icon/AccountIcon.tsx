import { BaseIcon } from "@/components/icon/BaseIcon";

interface Props {
  className?: string;
  size?: string;
}

// https://fonts.google.com/icons?selected=Material+Symbols+Rounded:person:FILL@0;wght@500;GRAD@0;opsz@24&icon.query=account&icon.size=24&icon.color=%235f6368&icon.style=Rounded
export const AccountIcon = (props: Props) => {
  return (
    <BaseIcon
      className={props.className}
      size={props.size}
      viewBox="0 -960 960 960"
    >
      <g>
        <path fill="currentColor" d="M480-484.07q-69.59 0-118.86-49.27-49.27-49.27-49.27-118.86 0-69.58 49.27-118.74 49.27-49.15 118.86-49.15t118.86 49.15q49.27 49.16 49.27 118.74 0 69.59-49.27 118.86-49.27 49.27-118.86 49.27ZM151.87-238.8v-29.61q0-36.23 18.74-66.59 18.74-30.37 49.8-46.35 62.72-31.24 127.67-46.98 64.94-15.74 131.92-15.74 67.43 0 132.39 15.62 64.96 15.62 127.2 46.86 31.06 15.95 49.8 46.25t18.74 66.93v29.61q0 37.78-26.61 64.39t-64.39 26.61H242.87q-37.78 0-64.39-26.61t-26.61-64.39Zm91 0h474.26v-28.42q0-10.77-5.5-19.58-5.5-8.81-14.5-13.7-52.56-26.04-106.85-39.3Q536-353.07 480-353.07q-55.52 0-110.28 13.27-54.76 13.26-106.85 39.3-9 4.89-14.5 13.7-5.5 8.81-5.5 19.58v28.42Zm237.12-336.27q31.81 0 54.48-22.65 22.66-22.65 22.66-54.47 0-31.81-22.65-54.35-22.66-22.55-54.47-22.55t-54.48 22.59q-22.66 22.59-22.66 54.3 0 31.82 22.65 54.48 22.66 22.65 54.47 22.65Zm.01-77.13Zm0 413.4Z" />
      </g>
    </BaseIcon>
  );
};
