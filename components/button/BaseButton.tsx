import * as React from "react";

import { CheckMarkIcon } from "@/components/icon/CheckMarkIcon";
import { EffectButton } from "@/components/button/EffectButton";
import { TrimWhitespace } from "@/modules/string/TrimWhitespace";

interface Props {
  background?: string;
  color?: string;
  confirm?: boolean;
  effect?: boolean;
  font?: string;
  hover?: string;
  margin?: string;
  onClick?: (eve: React.MouseEvent<HTMLDivElement>) => void;
  padding?: string;
  position?: string; // text position, either left or right from the icon
  icon: React.ReactElement;
  text?: React.ReactElement;
  timeout?: number;
}

export const BaseButton = React.forwardRef<HTMLDivElement, Props>(function BaseButton(props: Props, ref) {
  const [click, setClick] = React.useState<boolean>(false);
  const [disabled, setDisabled] = React.useState<boolean>(false);

  const onClick = (eve: React.MouseEvent<HTMLDivElement>) => {
    if (props.confirm === true) {
      {
        setClick(true);
      }

      setTimeout(() => {
        setClick(false);
      }, 3 * 1000);
    }

    if (props.timeout && props.timeout >= 0) {
      setDisabled(true);

      setTimeout(() => {
        setDisabled(false);
      }, props.timeout * 1000);
    }

    if (props.onClick) {
      props.onClick(eve);
    }
  };

  const render = (props: Props) => {
    return (
      <>
        {props.text && props.position === "left" && (
          <div className={`my-auto ${props.margin ? props.margin : "mr-2"}`}>
            {props.text && React.cloneElement(props.text, {})}
          </div>
        )}
        {props.confirm === true && click ? (
          <CheckMarkIcon className="cursor-default" />
        ) : (
          <>
            {props.icon && React.cloneElement(props.icon, {})}
          </>
        )}
        {props.text && (!props.position || props.position === "right") && (
          <div className={`my-auto ${props.margin ? props.margin : "ml-2"}`}>
            {props.text && React.cloneElement(props.text, {})}
          </div>
        )}
      </>
    );
  };

  return (
    <div
      className={TrimWhitespace(`
        flex w-full h-fit rounded outline-none group
        text-sm sm:text-base whitespace-nowrap
        ${disabled ? "cursor-default" : "cursor-pointer"}
        ${props.color ? props.color : "text-gray-400 dark:text-gray-500"}
        ${props.font ? props.font : "font-medium"}
        ${props.hover ? props.hover : ((props.confirm === true && click) || disabled) ? "" : "hover:text-black dark:hover:text-white"}
        ${props.background ? props.background : "hover:bg-gray-200 dark:hover:bg-gray-700"}
      `)}
      onClick={disabled ? undefined : onClick}
      ref={ref}
    >
      {props.effect === true && props.text ? (
        <EffectButton value={props.text}>
          {render(props)}
        </EffectButton>
      ) : (
        <div className={`flex ${props.padding ? props.padding : "p-2"} rounded items-center`}>
          {render(props)}
        </div>
      )}
    </div >
  );
});
