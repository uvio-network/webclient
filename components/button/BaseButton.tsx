import * as React from "react";

import { EffectButton } from "@/components/button/EffectButton";

interface Props {
  background?: string;
  effect?: boolean;
  font?: string;
  hover?: string;
  margin?: string;
  onClick?: (eve: React.MouseEvent<HTMLDivElement>) => void;
  padding?: string;
  position?: string; // text position, either left or right from the icon
  icon: React.ReactElement;
  text?: string;
}

export const BaseButton = React.forwardRef<HTMLDivElement, Props>(function BaseButton(props: Props, ref) {
  const render = (props: Props) => {
    return (
      <>
        {props.text && props.text !== "" && props.position === "left" && (
          <div className={`my-auto ${props.margin ? props.margin : "mr-2"}`}>
            {props.text}
          </div>
        )}
        {props.icon && React.cloneElement(props.icon, {})}
        {props.text && props.text !== "" && (!props.position || props.position === "right") && (
          <div className={`my-auto ${props.margin ? props.margin : "ml-2"}`}>
            {props.text}
          </div>
        )}
      </>
    );
  };

  return (
    <div
      className={`
        flex w-full h-fit rounded outline-none cursor-pointer group
        text-sm sm:text-base text-gray-400 dark:text-gray-500 whitespace-nowrap
        ${props.font ? props.font : "font-medium"}
        ${props.hover ? props.hover : "hover:text-black dark:hover:text-white"}
        ${props.background ? props.background : "hover:bg-gray-200 dark:hover:bg-gray-700"}
      `}
      onClick={props.onClick}
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
