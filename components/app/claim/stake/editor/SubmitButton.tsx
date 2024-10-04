import { StakeContext } from "@/modules/context/StakeContext";
import { SubmitForm } from "@/modules/app/claim/stake/SubmitForm";
import { ToTitle } from "@/modules/string/ToTitle";

interface Props {
  open: string;
  error: (ctx: StakeContext) => void;
  offchain: (ctx: StakeContext) => void;
  onchain: (ctx: StakeContext) => void;
}

export const SubmitButton = (props: Props) => {
  return (
    <button
      className="px-2 py-1 sm:py-4 w-full rounded text-gray-900 hover:text-black bg-blue-400 hover:bg-blue-500"
      type="button"
      onClick={() => {
        SubmitForm(props.error, props.offchain, props.onchain);
      }}
    >
      Stake in {ToTitle(props.open)}
    </button>
  );
};
