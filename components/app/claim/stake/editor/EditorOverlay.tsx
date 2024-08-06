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
        You are staking reputation in <strong>{props.open}</strong> with the claim&apos;s statement. Funds cannot be withdrawn, but will be distributed according to this market&apos;s resolution.
      </div>

      <div className="flex-none">
        <BaseButton
          hover="hover:text-black enabled:dark:hover:text-white"
          icon={<XMarkIcon />}
          onClick={() => props.setOpen("")}
        />
      </div>
    </div>
  );
};
