import Link from "next/link";

import * as ToastSender from "@/components/toast/ToastSender";

import { BaseButton } from "@/components/button/BaseButton";
import { DiscordLineIcon } from "@/components/icon/DiscordIcon";
import { GitBookIcon } from "@/components/icon/GitBookIcon";
import { GithubIcon } from "@/components/icon/GithubIcon";
import { TwitterLineIcon } from "@/components/icon/TwitterIcon";

export const SocialButton = () => {
  const onClick = () => {
    ToastSender.Info("It's comming just chill ok!");
  };

  return (
    <>
      <Link href="">
        <BaseButton
          icon={<DiscordLineIcon />}
          text="Discord"
          onClick={onClick}
        />
      </Link>

      <Link href="https://docs.uvio.network" target="_blank">
        <BaseButton
          icon={<GitBookIcon />}
          text="Documentation"
        />
      </Link>

      <Link href="https://github.com/uvio-network" target="_blank">
        <BaseButton
          icon={<GithubIcon />}
          text="Github"
        />
      </Link>

      <Link href="">
        <BaseButton
          icon={<TwitterLineIcon />}
          text="Twitter"
          onClick={onClick}
        />
      </Link>
    </>
  );
};
