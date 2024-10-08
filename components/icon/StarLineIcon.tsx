import { BaseIcon } from "@/components/icon/BaseIcon";

interface Props {
  className?: string;
  size?: string;
}

// https://fonts.google.com/icons?selected=Material+Symbols+Rounded:star:FILL@0;wght@300;GRAD@0;opsz@24&icon.size=24&icon.color=%235f6368&icon.style=Rounded
export const StarLineIcon = (props: Props) => {
  return (
    <BaseIcon
      className={props.className}
      size={props.size}
      viewBox="0 -960 960 960"
    >
      <g>
        <path fill="currentColor" d="m354-287 126-76 126 77-33-144 111-96-146-13-58-136-58 135-146 13 111 97-33 143Zm126-5.46-155.61 93.84q-8.7 5.08-17.43 4.27-8.73-.81-15.8-5.88-7.08-5.08-10.93-13.27-3.84-8.19-1.23-18.12l41.31-176.69-137.38-118.92q-7.7-6.69-9.81-15.5-2.12-8.81 1.11-17.12 3.23-8.3 9.31-13.57t16.62-6.89l181.3-15.84L451.85-763q3.84-9.31 11.65-13.77 7.81-4.46 16.5-4.46 8.69 0 16.5 4.46 7.81 4.46 11.65 13.77l70.39 166.85 181.3 15.84q10.54 1.62 16.62 6.89 6.08 5.27 9.31 13.57 3.23 8.31 1.11 17.12-2.11 8.81-9.81 15.5L639.69-408.31 681-231.62q2.61 9.93-1.23 18.12-3.85 8.19-10.93 13.27-7.07 5.07-15.8 5.88-8.73.81-17.43-4.27L480-292.46ZM480-470Z" />
      </g>
    </BaseIcon>
  );
};
