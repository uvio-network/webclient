import { BaseIcon } from "@/components/icon/BaseIcon";

interface Props {
  className?: string;
  size?: string;
}

// https://fonts.google.com/icons?selected=Material+Symbols+Outlined:content_copy:FILL@0;wght@500;GRAD@0;opsz@24&icon.query=copy&icon.size=24&icon.color=%235f6368
export const CopyIcon = (props: Props) => {
  return (
    <BaseIcon
      className={props.className}
      size={props.size}
      viewBox="0 -960 960 960"
    >
      <g>
        <path fill="currentColor" d="M368.37-237.37q-37.78 0-64.39-26.61t-26.61-64.39v-474.26q0-37.78 26.61-64.39t64.39-26.61h354.26q37.78 0 64.39 26.61t26.61 64.39v474.26q0 37.78-26.61 64.39t-64.39 26.61H368.37Zm0-91h354.26v-474.26H368.37v474.26Zm-171 262q-37.78 0-64.39-26.61t-26.61-64.39v-565.26h91v565.26h445.26v91H197.37Zm171-262v-474.26 474.26Z" />
      </g>
    </BaseIcon>
  );
};
