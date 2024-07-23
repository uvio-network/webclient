"use client";

import * as React from "react";

import { BaseButton } from "@/components/button/BaseButton";
import { InfoCircleIcon } from "@/components/icon/base/InfoCircleIcon";
import { PageHeader } from "@/components/page/PageHeader";
import { ThemeSwitch } from "@/components/theme/ThemeSwitch";
import { useToastStore } from "@/components/store/ToastStore";

export default function Home() {
  return (
    <>
      <PageHeader titl="Hello World" />

      <ThemeSwitch />

      <BaseButton
        onClick={() => {
          useToastStore.getState().addToast({
            clss: "bg-red-500",
            titl: "Error",
            text: "Hey buddy, fix it. It broke!",
          });
        }}
      >
        <InfoCircleIcon />
      </BaseButton>

      <BaseButton
        onClick={() => {
          useToastStore.getState().addToast({
            clss: "bg-green-500",
            titl: "Success",
            text: "Hey buddy, it's great",
          });
        }}
      >
        <InfoCircleIcon />
      </BaseButton>

      <BaseButton
        onClick={() => {
          useToastStore.getState().addToast({
            clss: "bg-yellow-300",
            titl: "Info",
            text: "you should really look at this",
          });
        }}
      >
        <InfoCircleIcon />
      </BaseButton>
    </>
  );
}
