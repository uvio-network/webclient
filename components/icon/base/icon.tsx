import * as React from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
  overwrite?: boolean;
  strokeWidth?: string;
  viewBox?: string;
}

export const Icon = (props: Props) => {
  const defaultClassName = `
    w-5 h-5
    text-gray-400 dark:text-gray-500
    ${props.disabled ? "opacity-80" : "group-hover:text-black dark:group-hover:text-white"}
  `;

  return (
    <svg
      className={props.overwrite ? props.className : defaultClassName + props.className}
      fill="none"
      onClick={props.onClick}
      strokeWidth={props.strokeWidth ? props.strokeWidth : "1"}
      viewBox={props.viewBox ? props.viewBox : "0 0 24 24"}
      xmlns="http://www.w3.org/2000/svg"
    >
      {props.children}
    </svg>
  );
};
