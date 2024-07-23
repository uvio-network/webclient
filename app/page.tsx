"use client";

import * as React from "react";

import { BaseButton } from "@/components/button/BaseButton";
import { InfoCircleIcon } from "@/components/icon/base/InfoCircleIcon";
import { PageHeader } from "@/components/page/PageHeader";
import {
  ErrorToast,
  InfoToast,
  SuccessToast,
  ToastRoot,
} from "@/components/toast/Toast";
import { ThemeSwitch } from "@/components/theme/ThemeSwitch";
import { useToastStore } from "@/stores/toasts";

import * as Toast from "@radix-ui/react-toast";

import { XMarkIcon } from "@/components/icon/base/XMarkIcon";
import {
  ToastBodyProps,
  ToastRootData,
  ToastRootState,
} from "@/components/toast/Interface";
import { ToastButton } from "@/components/button/ToastButton";

export default function Home() {
  const err = ErrorToast();
  const inf = InfoToast();
  const suc = SuccessToast();

  const { toasts } = useToastStore();

  return (
    <>
      <PageHeader titl="Hello World" />

      <ThemeSwitch />

      <BaseButton
        onClick={() => {
          useToastStore.getState().addToast({
            class: "err",
            title: "Whoa something broke",
            text: "Hey buddy, fix it. It broke!",
          });
        }}
      >
        <InfoCircleIcon />
      </BaseButton>

      <BaseButton
        onClick={() => {
          useToastStore.getState().addToast({
            class: "suc",
            title: "SUC IT",
            text: "Hey buddy, it's great",
          });
        }}
      >
        <InfoCircleIcon />
      </BaseButton>

      <BaseButton
        onClick={() => {
          suc.new("this is great");
        }}
      >
        <InfoCircleIcon />
      </BaseButton>

      {/* <ToastRoot ref={err.ref()} /> */}
      {/* <ToastRoot ref={inf.ref()} />
      <ToastRoot ref={suc.ref()} /> */}

      {toasts.map((t, i) => {
        return (
          <Toast.Root
            key={i}
            className={`
          p-4 text-black rounded-md items-center
          data-[state=open]:animate-slideIn data-[state=closed]:animate-hide data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-[transform_200ms_ease-out] data-[swipe=end]:animate-swipeOut
          ${t.class === "err" ? "bg-red-500" : "bg-green-500"}
        `}
            // onOpenChange={(open: boolean) => {
            //   if (open === false) {
            //     this.state.dict.delete(key);
            //   }
            // }}
          >
            <div className="flex">
              <Toast.Title className="grow font-medium">{t.title}</Toast.Title>
              <Toast.Close className="flex-none" aria-label="Close">
                <ToastButton>
                  <XMarkIcon
                    className="w-5 h-5 text-black group-hover:text-white dark:text-black dark:group-hover:text-white"
                    overwrite={true}
                  />
                </ToastButton>
              </Toast.Close>
            </div>
            <Toast.Description>{t.text}</Toast.Description>
          </Toast.Root>
        );
      })}
    </>
  );
}
