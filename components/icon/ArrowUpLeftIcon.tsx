import { BaseIcon } from "@/components/icon/BaseIcon";

interface Props {
  className?: string;
  size?: string;
}

// https://fonts.google.com/icons?selected=Material+Symbols+Rounded:arrow_top_left:FILL@0;wght@400;GRAD@0;opsz@24&icon.query=top+left+&icon.size=24&icon.color=%23e8eaed&icon.style=Rounded
export const ArrowUpLeftIcon = (props: Props) => {
  return (
    <BaseIcon
      className={props.className}
      size={props.size}
      viewBox="0 -960 960 960"
    >
      <g>
        <path fill="currentColor" d="m313-560 116 116q12 12 11.5 28T429-388q-12 12-28 12.5T373-387L188-572q-6-6-8.5-13t-2.5-15q0-8 2.5-15t8.5-13l183-183q12-12 28.5-12t28.5 12q12 12 12 28t-12 28L313-640h367q33 0 56.5 23.5T760-560v360q0 17-11.5 28.5T720-160q-17 0-28.5-11.5T680-200v-360H313Z" />
      </g>
    </BaseIcon>
  );
};
