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
        You are verifying that the proposed claim has been <strong>{props.open}</strong>. Your vote is binding and cannot be undone.
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
