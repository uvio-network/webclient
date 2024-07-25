import * as React from "react";
import * as Button from "@/components/sidebar/button/auth";

import { BarsLeftIcon } from "@/components/icon/BarsLeftIcon";
import { BaseButton } from "@/components/button/BaseButton";

export const Sidebar = () => {
  const [show, setShow] = React.useState<boolean>(false);

  const tglShow = () => {
    setShow((old: boolean) => !old);
  };

  React.useEffect(() => {
    const qry = window.matchMedia("(min-width: 1024px)"); // lg breakpoint

    // Set the initial state to decide whether the sidebar should be shown on
    // page load.
    {
      setShow(qry.matches);
    }

    // Toggle the show state as the screen width changes.
    const onChange = (eve: MediaQueryListEvent) => {
      setShow(eve.matches);
    };

    {
      qry.addEventListener("change", onChange);
    }

    return () => {
      qry.removeEventListener("change", onChange);
    };
  }, []);

  return (
    <div
      className={`
        fixed top-0 left-0 w-64 flex flex-row h-screen transition-transform transform
        ${show ? 'translate-x-0' : '-translate-x-full'}
      `}
    >
      <div
        className="flex-none w-full p-4 h-full shadow-gray-400 dark:shadow-white shadow-[0_0_2px] overflow-y-auto"
      >

        {/* All sidebar content goes here. */}
        <Button.Auth />

      </div>

      {/* This is the button that controls the visibility of the sidebar. */}
      <BaseButton
        className="mx-2 my-4 sm:m-4"
        onClick={tglShow}
      >
        <BarsLeftIcon />
      </BaseButton>

    </div>
  );
};
