import { BaseIcon } from "@/components/icon/BaseIcon";

interface Props {
  className?: string;
  size?: string;
}

// https://fonts.google.com/icons?selected=Material+Symbols+Outlined:content_copy:FILL@0;wght@500;GRAD@0;opsz@24&icon.query=copy&icon.size=24&icon.color=%235f6368
export const OpenLinkIcon = (props: Props) => {
  return (
    <BaseIcon
      className={props.className}
      size={props.size}
      viewBox="0 -960 960 960"
    >
      <g>
        <path fill="currentColor" d="M202.87-111.87q-37.78 0-64.39-26.61t-26.61-64.39v-554.26q0-37.78 26.61-64.39t64.39-26.61H480v91H202.87v554.26h554.26V-480h91v277.13q0 37.78-26.61 64.39t-64.39 26.61H202.87ZM395.41-332 332-395.41l361.72-361.72H560v-91h288.13V-560h-91v-133.72L395.41-332Z" />
      </g>
    </BaseIcon>
  );
};
