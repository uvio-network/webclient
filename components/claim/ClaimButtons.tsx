import { BaseButton } from "@/components/button/BaseButton";
import { XMarkIcon } from "@/components/icon/XMarkIcon";

interface Props {
  setShow: (show: string) => void;
  show: string;
}

export const ClaimButtons = (props: Props) => {
  return (
    <>
      {props.show && (
        <>
          <div className="absolute top-0 flex w-full h-14 rounded-t background-overlay">
            <div className="flex-1 p-2 text-xs">
              You are staking reputation in <strong> {props.show} </strong> with
              the proposed claim. Funds cannot be withdrawn, but will be
              distributed according to this market's resolution.
            </div>

            <div className="flex-none">
              <BaseButton
                hover="hover:text-black enabled:dark:hover:text-white"
                icon={<XMarkIcon />}
                onClick={() => props.setShow("")}
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
                  if (e.key === "Escape") props.setShow("");
                }}
                placeholder="0.003 ETH"
                autoFocus={true}
                type="text"
              />
            </div>

            <div className="w-full ml-2">
              <button
                className="p-4 w-full rounded text-gray-900 hover:text-black bg-sky-400 hover:bg-sky-500"
                type="button"
              >
                Stake Reputation
              </button>
            </div>
          </div>
        </>
      )}

      {!props.show && (
        <div className="flex px-2">
          <div className="w-full mr-2">
            <button
              className="p-4 w-full rounded text-gray-800 hover:text-black bg-emerald-400 hover:bg-emerald-500"
              onClick={() => props.setShow("agreement")}
              type="button"
            >
              Agree
            </button>
          </div>

          <div className="w-full ml-2">
            <button
              className="p-4 w-full rounded text-gray-900 hover:text-black bg-rose-400 hover:bg-rose-500"
              onClick={() => props.setShow("disagreement")}
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
