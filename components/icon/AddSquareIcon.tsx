import { BaseIcon } from "@/components/icon/BaseIcon";

interface Props {
  className?: string;
  size?: string;
}

// https://fonts.google.com/icons?selected=Material+Symbols+Rounded:add_box:FILL@0;wght@500;GRAD@0;opsz@24&icon.query=add+box&icon.size=24&icon.color=%235f6368&icon.style=Rounded
export const AddSquareIcon = (props: Props) => {
  return (
    <BaseIcon
      className={props.className}
      size={props.size}
      viewBox="0 -960 960 960"
    >
      <g>
        <path fill="currentColor" d="M436.41-436.41v114.74q0 18.52 12.53 31.05 12.54 12.53 31.06 12.53t31.06-12.53q12.53-12.53 12.53-31.05v-114.74h114.74q18.52 0 31.05-12.53 12.53-12.54 12.53-31.06t-12.53-31.06q-12.53-12.53-31.05-12.53H523.59v-114.74q0-18.52-12.53-31.05-12.54-12.53-31.06-12.53t-31.06 12.53q-12.53 12.53-12.53 31.05v114.74H321.67q-18.52 0-31.05 12.53-12.53 12.54-12.53 31.06t12.53 31.06q12.53 12.53 31.05 12.53h114.74ZM202.87-111.87q-37.78 0-64.39-26.61t-26.61-64.39v-554.26q0-37.78 26.61-64.39t64.39-26.61h554.26q37.78 0 64.39 26.61t26.61 64.39v554.26q0 37.78-26.61 64.39t-64.39 26.61H202.87Zm0-91h554.26v-554.26H202.87v554.26Zm0-554.26v554.26-554.26Z" />
      </g>
    </BaseIcon>
  );
};
