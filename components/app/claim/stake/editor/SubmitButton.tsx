import { StakeContext } from "@/modules/context/StakeContext";
import { SubmitForm } from "@/modules/app/claim/stake/SubmitForm";

interface Props {
  error: (ctx: StakeContext) => void;
  offchain: (ctx: StakeContext) => void;
  onchain: (ctx: StakeContext) => void;
}

export const SubmitButton = (props: Props) => {
  return (
    <button
      className="p-4 w-full rounded text-gray-900 hover:text-black bg-sky-400 hover:bg-sky-500"
      type="button"
      onClick={() => {
        SubmitForm(props.error, props.offchain, props.onchain);
      }}
    >
      Stake Reputation
    </button>
  );
};
