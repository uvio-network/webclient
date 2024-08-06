"use client";

import Link from "next/link";

import * as ToastSender from "@/components/toast/ToastSender";

import { AuthStore } from "@/components/auth/AuthStore";
import { BaseButton } from "@/components/button/BaseButton";
import { AddSquareIcon } from "@/components/icon/AddSquareIcon";
import { useShallow } from "zustand/react/shallow";

export const ProposeButton = () => {
  const { valid } = AuthStore(useShallow((state) => ({ valid: state.auth.valid })));

  const onClick = (e: React.MouseEvent) => {
    if (!valid) {
      e.preventDefault();
      ToastSender.Info("You need to login to propose a claim!");
    }
  };

  return (
    <Link
      href="/claim/propose"
      onClick={onClick}
    >
      <BaseButton
        icon={<AddSquareIcon />}
        text="Propose Claim"
      />
    </Link>
  );
};
