import * as React from "react";

import { EffectButton } from "@/components/button/EffectButton";

interface Props {
  font?: string;
  effect?: boolean;
  position?: string; // text position, either left or right from the icon
  icon?: React.ReactElement;
  text?: string;
}

export const NoButton = (props: Props) => {
  const render = (props: Props) => {
    return (
      <>
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
      </>
    );
  };

  return (
    <div
      className={`
        flex w-full h-fit rounded outline-none
        text-sm sm:text-base text-gray-400 dark:text-gray-500 whitespace-nowrap
        ${props.font ? props.font : "font-medium"}
      `}
    >
      {props.effect === true && props.text ? (
        <EffectButton value={props.text}>
          {render(props)}
        </EffectButton>
      ) : (
        <div className="flex p-2 rounded items-center">
          {render(props)}
        </div>
      )}
    </div >
  );
};
