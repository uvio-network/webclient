"use client";

import * as ToastSender from "@/components/toast/ToastSender";

import { AuthStore } from "@/components/auth/AuthStore";
import { BaseButton } from "@/components/button/BaseButton";
import { AddSquareIcon } from "@/components/icon/AddSquareIcon";
import { useRouter } from "next/navigation";
import { useShallow } from "zustand/react/shallow";

export const ProposeButton = () => {
  const { valid } = AuthStore(useShallow((state) => ({ valid: state.auth.valid })));

  const router = useRouter();

  const onClick = () => {
    if (valid) {
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
