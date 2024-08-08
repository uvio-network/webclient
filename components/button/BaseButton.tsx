import * as React from "react";

interface Props {
  disabled?: boolean;
  font?: string;
  hover?: string;
  onClick?: (eve: React.MouseEvent<HTMLButtonElement>) => void;
  position?: string; // text position, either left or right from the icon
  icon: React.ReactElement;
  text?: string;
}

export const BaseButton = (props: Props) => {
  return (
    <button
      className={`
        flex p-2 w-full h-fit items-center rounded-lg outline-none group
        text-sm sm:text-base text-gray-400 dark:text-gray-500 whitespace-nowrap
        ${props.font ? props.font : "font-medium"}
        ${props.disabled ? "opacity-50" : props.hover ? props.hover : "enabled:hover:text-black enabled:dark:hover:text-white enabled:hover:bg-gray-200 enabled:dark:hover:bg-gray-700"}
      `}
      disabled={props.disabled}
      onClick={props.onClick}
      type="button"
    >
      {props.text && props.text !== "" && props.position === "left" && (
        <div className="my-auto mr-2">
          {props.text}
        </div>
      )}
      {props.icon && React.cloneElement(props.icon, {
        disabled: props.disabled,
      })}
      {props.text && props.text !== "" && (!props.position || props.position === "right") && (
        <div className="my-auto ml-2">
          {props.text}
        </div>
      )}
    </button >
  );
};
