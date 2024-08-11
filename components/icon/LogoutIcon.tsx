import { BaseIcon } from "@/components/icon/BaseIcon";

interface Props {
  className?: string;
  size?: string;
}

// https://fonts.google.com/icons?selected=Material+Symbols+Rounded:logout:FILL@0;wght@500;GRAD@0;opsz@24&icon.query=logout&icon.size=24&icon.color=%235f6368&icon.style=Rounded
export const LogoutIcon = (props: Props) => {
  return (
    <BaseIcon
      className={props.className}
      size={props.size}
      viewBox="0 -960 960 960"
    >
      <g>
        <path fill="currentColor" d="M202.87-111.87q-37.78 0-64.39-26.61t-26.61-64.39v-554.26q0-37.78 26.61-64.39t64.39-26.61h233.54q19.16 0 32.33 13.17 13.17 13.18 13.17 32.33t-13.17 32.33q-13.17 13.17-32.33 13.17H202.87v554.26h233.54q19.16 0 32.33 13.17 13.17 13.18 13.17 32.33t-13.17 32.33q-13.17 13.17-32.33 13.17H202.87ZM674.56-434.5H403.59q-19.16 0-32.33-13.17-13.17-13.18-13.17-32.33t13.17-32.33q13.17-13.17 32.33-13.17h270.97L605.07-595q-12.68-12.67-12.68-31.07 0-18.39 12.68-31.82 12.67-13.68 31.7-14.06 19.03-.38 32.71 13.3L816.3-511.83q13.44 13.68 13.44 31.83t-13.44 31.83L669.48-301.35q-13.44 13.68-32.21 13.3-18.77-.38-32.2-14.06-12.68-13.43-12.3-32.21.38-18.77 13.06-31.44l68.73-68.74Z" />
      </g>
    </BaseIcon>
  );
};
