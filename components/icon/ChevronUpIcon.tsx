import { BaseIcon } from "@/components/icon/BaseIcon";

interface Props {
  className?: string;
  size?: string;
}

// https://fonts.google.com/icons?selected=Material+Symbols+Rounded:keyboard_arrow_up:FILL@0;wght@400;GRAD@0;opsz@24&icon.query=keyboard+arrow&icon.style=Rounded&icon.size=24&icon.color=%235f6368
export const ChevronUpIcon = (props: Props) => {
  return (
    <BaseIcon
      className={props.className}
      size={props.size}
      viewBox="0 -960 960 960"
    >
      <g>
        <path fill="currentColor" d="M480-528 324-372q-11 11-28 11t-28-11q-11-11-11-28t11-28l184-184q12-12 28-12t28 12l184 184q11 11 11 28t-11 28q-11 11-28 11t-28-11L480-528Z" />
      </g>
    </BaseIcon>
  );
};
