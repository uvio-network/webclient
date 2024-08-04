import { BaseButton } from "@/components/button/BaseButton";
import { ClaimVotes } from "@/modules/claim/object/ClaimVotes";
import { XMarkIcon } from "@/components/icon/XMarkIcon";

interface Props {
  open: string;
  setOpen: (open: string) => void;
  token: string;
  votes: ClaimVotes;
}

export const ClaimButtons = (props: Props) => {
  return (
    <>
      {props.open && (
        <>
          <div className="absolute top-0 flex w-full h-14 rounded-t background-overlay">
            <div className="flex-1 p-2 text-xs">
              You are staking reputation in <strong> {props.open} </strong> with
              the claim&apos;s statement. Funds cannot be withdrawn, but will be
              distributed according to this market&apos;s resolution.
            </div>

            <div className="flex-none">
              <BaseButton
                hover="hover:text-black enabled:dark:hover:text-white"
                icon={<XMarkIcon />}
                onClick={() => props.setOpen("")}
              />
            </div>
          </div>

          <div className="flex px-2 h-14">
            <div className="w-full mr-2">
              <input
                className={`
                  w-full h-full
                  background-overlay outline-none
                  placeholder:text-gray-400 placeholder:dark:text-gray-500
                  text-2xl sm:text-4xl font-light text-right caret-sky-400
                `}
                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                  if (e.key === "Escape") props.setOpen("");
                }}
                placeholder={`${props.votes.minimum} ${props.token}`}
                autoFocus={true}
                type="text"
              />
            </div>

            <div className="w-full ml-2">
              <button
                className="p-4 w-full rounded text-gray-900 hover:text-black bg-sky-400 hover:bg-sky-500"
                type="button"
              // TODO process submit, validate input, handle errors like minimum stake too low
              >
                Stake Reputation
              </button>
            </div>
          </div>
        </>
      )}

      {!props.open && (
        <div className="flex px-2">
          <div className="w-full mr-2">
            <button
              className="p-4 w-full rounded text-gray-800 hover:text-black bg-emerald-400 hover:bg-emerald-500"
              onClick={() => props.setOpen("agreement")}
              type="button"
            >
              Agree
            </button>
          </div>

          <div className="w-full ml-2">
            <button
              className="p-4 w-full rounded text-gray-900 hover:text-black bg-rose-400 hover:bg-rose-500"
              onClick={() => props.setOpen("disagreement")}
              type="button"
            >
              Disagree
            </button>
          </div>
        </div>
      )}
    </>
  );
};
