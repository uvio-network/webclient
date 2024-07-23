import * as React from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const ToastButton = (props: Props) => {
  return (
    <div
      className={`
        h-fit items-center rounded-md hover:bg-black outline-none group
        ${props.className}
      `}
      onClick={props.onClick}
    >
      {props.children}
    </div>
  );
};
