import * as ToastSender from "@/components/toast/ToastSender";

import { EditorStore } from "@/components/app/claim/stake/editor/EditorStore";
import { UserStore } from "@/modules/user/UserStore";
import { useShallow } from "zustand/react/shallow";

const agreement = "agree";
const disagreement = "disagree";

interface Props {
  expired: boolean;
  setOpen: (open: string) => void;
}

export const StakeButtons = (props: Props) => {
  const { valid } = UserStore(useShallow((state) => ({
    valid: state.user.valid,
  })));

  const editor = EditorStore.getState();

  const onClick = (act: string) => {
    return () => {
      if (props.expired) {
        ToastSender.Info("This claim has expired already.");
        return;
      }

      if (!valid) {
        ToastSender.Info("You need to login to stake reputation.");
        return;
      }

      {
        editor.updateOption(act === agreement ? "true" : "false")
        props.setOpen(act);
      }
    };
  };

  return (
    <div className="flex gap-x-2 mt-4 mb-2">
      <div className="flex-1 w-full">
        <button
          className={`
            p-4 w-full rounded
            ${props.expired ? "text-gray-400 dark:text-gray-500 bg-gray-200 dark:bg-gray-700 cursor-default" : "text-gray-900 hover:text-black bg-emerald-400 hover:bg-emerald-500"}
          `}
          onClick={onClick(agreement)}
          type="button"
        >
          Agree
        </button>
      </div>

      <div className="flex-1 w-full">
        <button
          className={`
            p-4 w-full rounded
            ${props.expired ? "text-gray-400 dark:text-gray-500 bg-gray-200 dark:bg-gray-700 cursor-default" : "text-gray-900 hover:text-black bg-rose-400 hover:bg-rose-500"}
          `}
          onClick={onClick(disagreement)}
          type="button"
        >
          Disagree
        </button>
      </div>
    </div>
  );
};
