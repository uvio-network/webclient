import * as ToastSender from "@/components/toast/ToastSender";

import { EditorStore } from "@/components/app/claim/truth/editor/EditorStore";
import { UserStore } from "@/modules/user/UserStore";
import { useShallow } from "zustand/react/shallow";

const agreement = "true";
const disagreement = "false";

interface Props {
  expired: boolean;
  setOpen: (open: string) => void;
}

export const TruthButtons = (props: Props) => {
  const { valid } = UserStore(useShallow((state) => ({
    valid: state.user.valid,
  })));

  const editor = EditorStore.getState();

  const onClick = (act: string) => {
    return () => {
      if (props.expired) {
        ToastSender.Info("This claim has already expired!");
        return;
      }

      if (!valid) {
        ToastSender.Info("You need to login to verify the truth!");
        return;
      }

      {
        editor.updateOption(act === agreement ? "true" : "false")
        props.setOpen(act);
      }
    };
  };

  return (
    <div className="flex mb-2 px-2">
      <div className="w-full mr-2">
        <button
          className={`
            p-4 w-full rounded
            ${props.expired ? "text-gray-400 dark:text-gray-500 bg-gray-200 dark:bg-gray-700 cursor-default" : "text-gray-800 hover:text-black bg-emerald-400 hover:bg-emerald-500"}
          `}
          onClick={onClick(agreement)}
          type="button"
        >
          True
        </button>
      </div>

      <div className="w-full ml-2">
        <button
          className={`
            p-4 w-full rounded
            ${props.expired ? "text-gray-400 dark:text-gray-500 bg-gray-200 dark:bg-gray-700 cursor-default" : "text-gray-900 hover:text-black bg-rose-400 hover:bg-rose-500"}
          `}
          onClick={onClick(disagreement)}
          type="button"
        >
          False
        </button>
      </div>
    </div>
  );
};
