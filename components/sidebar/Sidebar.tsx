"use client";

import * as React from "react";
import * as Separator from "@/components/layout/separator";

import { AppLogo } from "@/components/app/AppLogo";
import { AuthButton } from "@/components/sidebar/button/AuthButton";
import { BarsLeftIcon } from "@/components/icon/BarsLeftIcon";
import { BaseButton } from "@/components/button/BaseButton";
import { ProposeButton } from "@/components/sidebar/button/ProposeButton";
import { SocialButton } from "@/components/sidebar/button/SocialButton";
import { ThemeButton } from "@/components/sidebar/button/ThemeButton";
import { UserButton } from "@/components/sidebar/button/UserButton";

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
        bg-white dark:bg-black
        ${show ? 'translate-x-0' : '-translate-x-full'}
      `}
    >
      <div
        className="flex-none w-full p-4 h-full border-gray-300 dark:border-gray-600 border-r-[1px] overflow-y-auto"
      >
        {/* All sidebar content goes here. */}
        <AppLogo />

        <Separator.Horizontal />

        {/* lists */}
        <ProposeButton />

        <Separator.Horizontal />

        <UserButton />
        <ThemeButton />
        {/* settings */}
        <AuthButton />

        <Separator.Horizontal />

        <SocialButton />
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
