import { BaseIcon } from "@/components/icon/BaseIcon";

interface Props {
  className?: string;
  disabled?: boolean;
}

export const LoginIcon = (props: Props) => {
  return (
    <BaseIcon
      className={props.className}
      disabled={props.disabled}
      strokeWidth="2"
    >
      <g>
        <path stroke="currentColor" strokeLinecap="round" d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
        <polyline stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" points="10 17 15 12 10 7" />
        <line stroke="currentColor" strokeLinecap="round" x1="15" y1="12" x2="3" y2="12" />
      </g>
    </BaseIcon>
  );
};
