import * as React from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const BaseButton = (props: Props) => {
  return (
    <button
      className={`
        p-2 h-fit items-center rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 outline-none group
        ${props.className}
      `}
      onClick={props.onClick}
      type="button"
    >
      {props.children}
    </button>
  );
};
