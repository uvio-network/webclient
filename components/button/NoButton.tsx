import * as React from "react";

interface Props {
  font?: string;
  position?: string; // text position, either left or right from the icon
  icon: React.ReactElement;
  text?: string;
}

export const NoButton = (props: Props) => {
  return (
    <div
      className={`
        flex p-2 w-full h-fit items-center rounded-lg outline-none
        text-sm sm:text-base text-gray-400 dark:text-gray-500 whitespace-nowrap
        ${props.font ? props.font : "font-medium"}
      `}
    >
      {props.text && props.text !== "" && props.position === "left" && (
        <div className="my-auto mr-2">
          {props.text}
        </div>
      )}
      {props.icon && React.cloneElement(props.icon, {})}
      {props.text && props.text !== "" && (!props.position || props.position === "right") && (
        <div className="my-auto ml-2">
          {props.text}
        </div>
      )}
    </div >
  );
};
