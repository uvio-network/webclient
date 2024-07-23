"use client"

import * as React from "react";

import { BaseButton } from "@/components/button/BaseButton";
import { InfoCircleIcon } from "@/components/icon/base/InfoCircleIcon";
import { PageHeader } from "@/components/page/PageHeader";
import { ErrorToast, InfoToast, SuccessToast, ToastRoot } from "@/components/toast/Toast";
import { ThemeSwitch } from "@/components/theme/ThemeSwitch";

export default function Home() {
  const err = ErrorToast();
  const inf = InfoToast();
  const suc = SuccessToast();

  return (
    <>
      <PageHeader titl="Hello World" />

      <ThemeSwitch />

      <BaseButton onClick={() => {
        err.new("something's wrong");
      }}>
        <InfoCircleIcon />
      </BaseButton>

      <BaseButton onClick={() => {
        inf.new("you should read this");
      }}>
        <InfoCircleIcon />
      </BaseButton>

      <BaseButton onClick={() => {
        suc.new("this is great");
      }}>
        <InfoCircleIcon />
      </BaseButton>

      <ToastRoot ref={err.ref()} />
      <ToastRoot ref={inf.ref()} />
      <ToastRoot ref={suc.ref()} />
    </>
  );
};
