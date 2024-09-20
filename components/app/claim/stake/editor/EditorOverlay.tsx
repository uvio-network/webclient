import Link from "next/link";

import { BaseButton } from "@/components/button/BaseButton";
import { XMarkIcon } from "@/components/icon/XMarkIcon";

interface Props {
  open: string;
  setOpen: (open: string) => void;
}

export const EditorOverlay = (props: Props) => {
  return (
    <div className="absolute top-0 flex w-full h-14 rounded-t background-overlay">
      <div className="flex-1 p-2 text-xs">
        You are about to stake funds in <strong>{props.open}</strong> with the claim&apos;s statement.
        There is no guarantee of getting your money back. Please read the docs at&nbsp;
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
