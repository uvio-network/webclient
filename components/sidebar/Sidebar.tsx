"use client";

import * as React from "react";

import { AppLogo } from "@/components/app/AppLogo";
import { AuthButton } from "@/components/sidebar/button/AuthButton";
import { BarsLeftIcon } from "@/components/icon/BarsLeftIcon";
import { BaseButton } from "@/components/button/BaseButton";
import { HorizontalSeparator } from "@/components/layout/HorizontalSeparator";
import { LifecycleButton } from "@/components/sidebar/button/LifecycleButton";
import { LoadingStore } from "@/components/loading/LoadingStore";
import { NotificationButton } from "@/components/sidebar/button/NotificationButton";
import { ProposeButton } from "@/components/sidebar/button/ProposeButton";
import { SocialButton } from "@/components/sidebar/button/SocialButton";
import { ThemeButton } from "@/components/sidebar/button/ThemeButton";
import { UserButton } from "@/components/sidebar/button/UserButton";
import { WalletButton } from "@/components/sidebar/button/WalletButton";
import { WindowStore } from "@/modules/window/WindowStore";

export const Sidebar = () => {
  const [show, setShow] = React.useState<boolean>(false);

  const onClick = () => {
    // Hide the sidebar if the user clicks a button while the user's screen
    // width is below the lg breakpoint.
    if (!WindowStore.getState().breakpoint) {
      setShow(false);
    }
  };

  const tglShow = () => {
    setShow((old: boolean) => !old);
  };

  React.useEffect(() => {
    const qry = window.matchMedia("(min-width: 1024px)"); // lg breakpoint

    // Set the initial state to decide whether the sidebar should be shown on
    // page load.
    {
      setShow(qry.matches);
      WindowStore.getState().updateBreakpoint(qry.matches);
    }

    // Toggle the show state as the screen width changes.
    const onChange = (eve: MediaQueryListEvent) => {
      setShow(eve.matches);
      WindowStore.getState().updateBreakpoint(eve.matches);
    };

    {
      qry.addEventListener("change", onChange);
    }

    return () => {
      qry.removeEventListener("change", onChange);
    };
  }, []);

  {
    const { loaded } = LoadingStore();

    if (!loaded) {
      return <></>;
    }
  }

  return (
    <div
      className={`
        fixed top-0 left-0 z-10 w-64 flex flex-row h-screen transition-transform transform
        background
        ${show ? 'translate-x-0' : '-translate-x-full'}
      `}
    >
      <div
        className="flex-none w-full p-4 h-full border-r border-color overflow-y-auto"
      >
        {/* All sidebar content goes here. */}
        <AppLogo onClick={onClick} />

        <HorizontalSeparator />

        {/* lists */}
        <ProposeButton onClick={onClick} />
        <NotificationButton onClick={onClick} />

        <HorizontalSeparator />

        <LifecycleButton onClick={onClick} />

        <HorizontalSeparator />

        <UserButton onClick={onClick} />
        <WalletButton onClick={onClick} />
        <ThemeButton onClick={onClick} />
        {/* settings */}
        <AuthButton onClick={onClick} />

        <HorizontalSeparator />

        <SocialButton onClick={onClick} />
      </div>

      {/* This is the button that controls the visibility of the sidebar. */}
      <div className="w-fit h-fit mx-2 my-4 sm:m-4">
        <BaseButton
          onClick={tglShow}
          icon={<BarsLeftIcon />}
        />
      </div>
    </div>
  );
};
