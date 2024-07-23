import * as React from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

// ToastButton is primarily used for the close action in the toast component. We
// need a separate "button" using only a div element there, because we cannot
// use button elements within button elements. In other words, because the Radix
// component uses a button element for the close action already, our "button"
// component here cannot use a button element again, which is why we use a div
// element to wrap the child components.
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
