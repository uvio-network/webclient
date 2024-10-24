"use client";

import Link from "next/link";

import * as React from "react";
import * as ToastSender from "@/components/toast/ToastSender";

import { BaseButton } from "@/components/button/BaseButton";
import { AddSquareIcon } from "@/components/icon/AddSquareIcon";
import { UserStore } from "@/modules/user/UserStore";
import { useShallow } from "zustand/react/shallow";

interface Props {
  onClick: () => void;
}

export const ProposeButton = (props: Props) => {
  const { valid } = UserStore(useShallow((state) => ({
    valid: state.valid,
  })));

  const onClick = (e: React.MouseEvent) => {
    if (!valid) {
      e.preventDefault();
      ToastSender.Info("You need to login to propose a claim.");
    }

    props.onClick();
  };

  return (
    <Link
      href="/claim/propose"
      onClick={onClick}
    >
      <BaseButton
        icon={<AddSquareIcon />}
        text={<>Propose Claim</>}
      />
    </Link>
  );
};
