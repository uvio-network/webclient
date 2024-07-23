"use client";

import * as React from "react";

import { BarsLeftIcon } from "@/components/icon/base/BarsLeftIcon";
import { BaseButton } from "@/components/button/BaseButton";

export const Provider = () => {
  const [show, setShow] = React.useState<boolean>(false);

  const tglShow = () => {
    setShow((old: boolean) => !old);
  };

  React.useEffect(() => {
    const qry = window.matchMedia("(min-width: 1024px)"); // lg breakpoint

    {
      setShow(qry.matches);
    }

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

        more

      </div>

      <BaseButton
        className="mx-2 my-4 sm:m-4"
        onClick={tglShow}
      >
        <BarsLeftIcon />
      </BaseButton>

    </div>
  );
};
