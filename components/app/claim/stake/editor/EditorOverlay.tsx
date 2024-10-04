import Link from "next/link";

import { BaseButton } from "@/components/button/BaseButton";
import { XMarkIcon } from "@/components/icon/XMarkIcon";

interface Props {
  open: string;
  setOpen: (open: string) => void;
}

export const EditorOverlay = (props: Props) => {
  return (
    <div className="absolute top-0 flex w-full h-12 rounded-t background-overlay">
      <div className="flex-1 p-2 text-xs">
        You are staking in <strong>{props.open}</strong> with this claim.
        There is no guarantee of repayment. Learn more at&nbsp;
        <Link
          className="text-blue-400"
          href="https://docs.uvio.network"
          target="_blank"
        >
          docs.uvio.network
        </Link>
        .
      </div>

      <div className="flex-none">
        <BaseButton
          background="none"
          icon={<XMarkIcon />}
          onClick={() => props.setOpen("")}
        />
      </div>
    </div>
  );
};
