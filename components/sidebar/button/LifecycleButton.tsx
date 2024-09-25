import Link from "next/link";

import { BaseButton } from "@/components/button/BaseButton";
import { CycleIcon } from "@/components/icon/CycleIcon";

export const LifecycleButton = () => {
  return (
    <>
      <Link href="/claim/lifecycle/dispute">
        <BaseButton
          icon={<CycleIcon />}
          text="Disputed Claims"
        />
      </Link>

      <Link href="/claim/lifecycle/propose">
        <BaseButton
          icon={<CycleIcon />}
          text="Proposed Claims"
        />
      </Link>

      <Link href="/claim/lifecycle/resolve">
        <BaseButton
          icon={<CycleIcon />}
          text="Market Resolutions"
        />
      </Link>
    </>
  );
};
