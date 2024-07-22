"use client"

import * as React from "react";
import * as Toast from "@radix-ui/react-toast";

import { ThemeSwitch } from "@/components/theme/ThemeSwitch";
import { InfoCircleIcon } from "@/components/icon/base/InfoCircleIcon";
import { ErrorToast, InfoToast, SuccessToast, ToastRoot } from "@/components/toast/InfoToast";

export default function Home() {
  const a = ErrorToast();
  const b = InfoToast();
  const c = SuccessToast();

  return (
    <Toast.Provider duration={10 * 1000} swipeDirection="right">
      <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-white text-black dark:bg-black dark:text-white">
        <div className="w-full max-w-5xl items-center justify-between text-sm">

          hello world
          <ThemeSwitch />

          <button onClick={() => {
            a.new("something's wrong");
          }}>
            <InfoCircleIcon />
          </button>

          <button onClick={() => {
            b.new("you should read this");
          }}>
            <InfoCircleIcon />
          </button>

          <button onClick={() => {
            c.new("this is great");
          }}>
            <InfoCircleIcon />
          </button>

          <ToastRoot ref={a.ref()} />
          <ToastRoot ref={b.ref()} />
          <ToastRoot ref={c.ref()} />

          <Toast.Viewport className="[--viewport-padding:_25px] fixed bottom-0 right-0 flex flex-col p-[var(--viewport-padding)] gap-[10px] w-[390px] max-w-[100vw] m-0 list-none z-[2147483647] outline-none" />
        </div>
      </main >
    </Toast.Provider >
  );
};
