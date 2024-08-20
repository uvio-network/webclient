import Link from "next/link";

import { BaseButton } from "@/components/button/BaseButton";
import { CycleIcon } from "@/components/icon/CycleIcon";

export const LifecycleButton = () => {
  return (
    <>
      <Link href="/claim/lifecycle/adjourn">
        <BaseButton
          icon={<CycleIcon />}
          text="Lifecycle Adjourn"
        />
      </Link>

      <Link href="/claim/lifecycle/dispute">
        <BaseButton
          icon={<CycleIcon />}
          text="Lifecycle Dispute"
        />
      </Link>

      <Link href="/claim/lifecycle/nullify">
        <BaseButton
          icon={<CycleIcon />}
          text="Lifecycle Nullify"
        />
      </Link>

      <Link href="/claim/lifecycle/propose">
        <BaseButton
          icon={<CycleIcon />}
          text="Lifecycle Propose"
        />
      </Link>

      <Link href="/claim/lifecycle/resolve">
        <BaseButton
          icon={<CycleIcon />}
          text="Lifecycle Resolve"
        />
      </Link>
    </>
  );
};
