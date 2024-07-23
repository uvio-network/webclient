"use client"

import * as React from "react";

import { BaseButton } from "@/components/button/BaseButton";
import { ContrastIcon } from "@/components/icon/base/ContrastIcon";
import { MoonLineIcon } from "@/components/icon/base/MoonLineIcon";
import { SunLineIcon } from "@/components/icon/base/SunLineIcon";

const thmKey = "uvio.network/theme";

const thmSys = "system";
const thmLgt = "light";
const thmDrk = "dark";

interface Props { }

export const ThemeSwitch = (props: Props) => {
  const [syst, setSyst] = React.useState<string>(getThm());
  const [them, setThem] = React.useState<string>(getThm());

  // Add the relevant event listeners on the initial page render and ensure that
  // the current system settings are already recorded, even if they are not
  // requested yet.
  React.useEffect(() => {
    const qry = window.matchMedia("(prefers-color-scheme: dark)");

    if (qry.matches) {
      setSyst(thmDrk);
    } else {
      setSyst(thmLgt);
    }

    // Sync with system theme when the user changes the systems settings
    // manually in the OS settings.
    const onChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        setSyst(thmDrk);
      } else {
        setSyst(thmLgt);
      }
    };

    // Sync with system theme when the user visits the open browser tab again.
    const onVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        if (qry.matches) {
          setSyst(thmDrk);
        } else {
          setSyst(thmLgt);
        }
      }
    };

    // Listen to theme changes in the user's OS settings and trigger a re-render
    // to configuration the desired colour theme.
    {
      qry.addEventListener("change", onChange);
      document.addEventListener("visibilitychange", onVisibilityChange);
    }
  }, []);

  // Apply the user's colour theme selection using the component state.
  React.useEffect(() => {
    if (them === thmSys) {
      if (syst === thmLgt) {
        setLgt();
      }
      if (syst === thmDrk) {
        setDrk();
      }
    }
    if (them === thmLgt) {
      setLgt();
    }
    if (them === thmDrk) {
      setDrk();
    }
  }, [syst, them]);

  return (
    <>
      <BaseButton onClick={() => {
        localStorage.setItem(thmKey, thmSys);
        setThem(thmSys);
      }}>
        <ContrastIcon />
      </BaseButton>

      <BaseButton onClick={() => {
        localStorage.setItem(thmKey, thmLgt);
        setThem(thmLgt);
      }}>
        <SunLineIcon />
      </BaseButton>

      <BaseButton onClick={() => {
        localStorage.setItem(thmKey, thmDrk);
        setThem(thmDrk);
      }}>
        <MoonLineIcon />
      </BaseButton>
    </>
  );
};

// getThm returns the currently configured state for the user's theme settings,
// which can either be "system", "light" or "dark". If the user has no theme
// configured, we default to "system".
const getThm = (): string => {
  if (typeof window === "undefined") {
    return thmSys;
  }

  const val = localStorage.getItem(thmKey);

  if (val === null) {
    return thmSys;
  }

  if (val.toLowerCase() === thmSys) {
    return thmSys;
  }
  if (val.toLowerCase() === thmLgt) {
    return thmLgt;
  }
  if (val.toLowerCase() === thmDrk) {
    return thmDrk;
  }

  return thmSys;
};

// setDrk adds the "dark" classname to the dom's body and removes the classname
// "light". That classname change enables Tailwind to switch the colour theme.
const setDrk = () => {
  document.body.classList.add(thmDrk);
  document.body.classList.remove(thmLgt);
};

// setLgt adds the "light" classname to the dom's body and removes the classname
// "dark". That classname change enables Tailwind to switch the colour theme.
const setLgt = () => {
  document.body.classList.add(thmLgt);
  document.body.classList.remove(thmDrk);
};
