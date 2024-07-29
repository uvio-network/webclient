"use client";

import * as ToastSender from "@/components/toast/ToastSender";

import { AuthStore } from "@/components/auth/AuthStore";
import { BaseButton } from "@/components/button/BaseButton";
import { AddSquareIcon } from "@/components/icon/AddSquareIcon";
import { useRouter } from "next/navigation";

export const ProposeButton = () => {
  const { auth } = AuthStore();

  const router = useRouter();

  const onClick = () => {
    if (auth.valid) {
      router.push("/claim/propose");
    } else {
      ToastSender.Info("You need to login to propose a claim!");
    }
  };

  return (
    <BaseButton
      onClick={onClick}
      icon={<AddSquareIcon />}
      text="Propose Claim"
    />
  );
};
