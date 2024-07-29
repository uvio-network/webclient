import * as React from "react";

interface Props {
  disabled?: boolean;
  font?: string;
  onClick?: (eve: React.MouseEvent<HTMLButtonElement>) => void;
  position?: string;
  icon: React.ReactElement;
  text: string;
}

export const BaseButton = (props: Props) => {
  return (
    <button
      className={`
        flex p-2 w-full h-fit items-center rounded-lg outline-none group
        text-gray-400 dark:text-gray-500
        ${props.font ? props.font : "font-medium"}
        ${props.disabled ? "opacity-50" : "enabled:hover:text-black enabled:dark:hover:text-white enabled:hover:bg-gray-200 enabled:dark:hover:bg-gray-700"}
      `}
      disabled={props.disabled}
      onClick={props.onClick}
      type="button"
    >
      {props.text !== "" && props.position === "left" && (
        <div className="mr-2">
          {props.text}
        </div>
      )}
      {props.icon && React.cloneElement(props.icon, {
        disabled: props.disabled,
      })}
      {props.text !== "" && (!props.position || props.position === "right") && (
        <div className="ml-2">
          {props.text}
        </div>
      )}
    </button >
  );
};
