"use client";

import * as Auth from "@/components/auth/store";
import * as React from "react";
import * as Toast from "@/components/toast/sender";

import { BaseButton } from "@/components/button/BaseButton";
import { InfoCircleIcon } from "@/components/icon/InfoCircleIcon";
import { PageHeader } from "@/components/page/PageHeader";
import { ThemeSwitch } from "@/components/theme/ThemeSwitch";

export default function Home() {
  const { auth } = Auth.useStore();

  return (
    <>
      <PageHeader titl="Hello World" />

      <ThemeSwitch />

      <BaseButton
        onClick={() => {
          Toast.Error("Hey buddy, fix it. It broke!");
        }}
      >
        <InfoCircleIcon />
      </BaseButton>

      <BaseButton
        onClick={() => {
          Toast.Success("Yeah, it's great");
        }}
      >
        <InfoCircleIcon />
      </BaseButton>

      <BaseButton
        onClick={() => {
          Toast.Info("Dude you should really look at this");
        }}
      >
        <InfoCircleIcon />
      </BaseButton>

      <div>
        {auth.ready ? (
          <p>Access Token: {auth.token}</p>
        ) : (
          <p>User is not authenticated</p>
        )}
      </div>
    </>
  );
};
