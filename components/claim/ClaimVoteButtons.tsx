import * as ToastSender from "@/components/toast/ToastSender";

import { ClaimObject } from "@/modules/claim/ClaimObject";
import { EditorStore } from "@/modules/editor/EditorStore";
import { UserObject } from "@/modules/user/UserObject";

interface Props {
  claim: ClaimObject;
  user: UserObject | undefined;
}

export const ClaimVoteButtons = (props: Props) => {
  const hasVoted = props.claim.voted();
  const isExpired = props.claim.expired();
  const isResolve = props.claim.isResolve();
  const isSelected = props.claim.selected();
  const isUser = props.user !== undefined ? true : false;

  const isActive = claAct(isResolve, isExpired, isSelected, isUser, hasVoted);

  const onClick = (sid: boolean) => {
    return () => {
      if (isExpired) {
        return ToastSender.Info("This claim has expired already.");
      }

      if (!isUser) {
        return ToastSender.Info(`You need to login to ${isResolve ? "verify the truth" : "stake reputation"}.`);
      }

      if (isResolve) {
        if (!isSelected) {
          return ToastSender.Info("You have not been selected to vote on this resolution.");
        }

        if (hasVoted) {
          return ToastSender.Info("You have cast your vote already.");
        }
      }

      {
        EditorStore.getState().updateOption(sid)
        EditorStore.getState().updateOverlay(true)
      }
    };
  };

  return (
    <div className="flex gap-x-2 mt-4 mb-2">
      <div className="flex-1 w-full">
        <button
          className={`
            p-4 w-full rounded
            ${isActive ? "text-gray-900 hover:text-black bg-emerald-400 hover:bg-emerald-500" : "text-gray-400 dark:text-gray-500 bg-gray-200 dark:bg-gray-700 cursor-default"}
          `}
          onClick={onClick(true)}
          type="button"
        >
          {isResolve ? "True" : "Agree"}
        </button>
      </div>

      <div className="flex-1 w-full">
        <button
          className={`
            p-4 w-full rounded
            ${isActive ? "text-gray-900 hover:text-black bg-rose-400 hover:bg-rose-500" : "text-gray-400 dark:text-gray-500 bg-gray-200 dark:bg-gray-700 cursor-default"}
          `}
          onClick={onClick(false)}
          type="button"
        >
          {isResolve ? "False" : "Disagree"}
        </button>
      </div>
    </div>
  );
};

const claAct = (res: boolean, exp: boolean, sel: boolean, use: boolean, vot: boolean): boolean => {
  if (res) {
    return !exp && sel && use && !vot;
  }

  return !exp && use;
};
