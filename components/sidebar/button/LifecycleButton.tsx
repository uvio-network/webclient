import Link from "next/link";

import { BaseButton } from "@/components/button/BaseButton";
import { CycleIcon } from "@/components/icon/CycleIcon";

interface Props {
  onClick: () => void;
}

export const LifecycleButton = (props: Props) => {
  return (
    <>
      <Link href="/claim/lifecycle/dispute">
        <BaseButton
          icon={<CycleIcon />}
          onClick={props.onClick}
          text={<>Disputed Claims</>}
        />
      </Link>

      <Link href="/claim/lifecycle/propose">
        <BaseButton
          icon={<CycleIcon />}
          onClick={props.onClick}
          text={<>Proposed Claims</>}
        />
      </Link>

      <Link href="/claim/lifecycle/resolve">
        <BaseButton
          icon={<CycleIcon />}
          onClick={props.onClick}
          text={<>Resolving Claims</>}
        />
      </Link>

      <Link href="/claim/lifecycle/settled">
        <BaseButton
          icon={<CycleIcon />}
          onClick={props.onClick}
          text={<>Settled Claims</>}
        />
      </Link>
    </>
  );
};
