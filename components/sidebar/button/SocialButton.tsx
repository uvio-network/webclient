import Link from "next/link";

import * as React from "react";
import * as ToastSender from "@/components/toast/ToastSender";

import { BaseButton } from "@/components/button/BaseButton";
import { DiscordLineIcon } from "@/components/icon/DiscordIcon";
import { GitBookIcon } from "@/components/icon/GitBookIcon";
import { GithubIcon } from "@/components/icon/GithubIcon";
import { TwitterLineIcon } from "@/components/icon/TwitterIcon";

interface Props {
  onClick: () => void;
}

export const SocialButton = (props: Props) => {
  const onClick = (e: React.MouseEvent) => {
    e.preventDefault();
    ToastSender.Info("It's comming just chill ok!");
    props.onClick();
  };

  return (
    <>
      <Link href="https://discord.gg/fbkrSR44hr" target="_blank">
        <BaseButton
          icon={<DiscordLineIcon />}
          onClick={props.onClick}
          text={<>Discord</>}
        />
      </Link>

      <Link href="https://docs.uvio.network" target="_blank">
        <BaseButton
          icon={<GitBookIcon />}
          onClick={props.onClick}
          text={<>Documentation</>}
        />
      </Link>

      <Link href="https://github.com/uvio-network" target="_blank">
        <BaseButton
          icon={<GithubIcon />}
          onClick={props.onClick}
          text={<>Github</>}
        />
      </Link>

      <Link href="">
        <BaseButton
          icon={<TwitterLineIcon />}
          onClick={onClick}
          text={<>Twitter</>}
        />
      </Link>
    </>
  );
};
