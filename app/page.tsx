"use client"

import * as React from "react";
import * as Toast from "@radix-ui/react-toast";

import { Button } from "@/components/Button";
import { InfoCircleIcon } from "@/components/icon/base/InfoCircleIcon";
import { InfoToast } from "@/components/toast/InfoToast";

export default function Home() {
  const [open, setOpen] = React.useState<number>(0);

  return (
    <Toast.Provider swipeDirection="right">
      <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-white text-black dark:bg-black dark:text-white">
        <div className="w-full max-w-5xl items-center justify-between text-sm">

          hello world
          <Button />

          <button onClick={() => {
            setOpen(open => open + 1);
          }}>
            <InfoCircleIcon />
          </button>
          <InfoToast key={open} />


          <Toast.Viewport className="[--viewport-padding:_25px] fixed bottom-0 right-0 flex flex-col p-[var(--viewport-padding)] gap-[10px] w-[390px] max-w-[100vw] m-0 list-none z-[2147483647] outline-none" />
        </div>
      </main >
    </Toast.Provider >
  );
};
