import { ProposeContext } from "@/modules/context/ProposeContext";
import { SubmitForm } from "@/modules/app/claim/propose/SubmitForm";

interface Props {
  error: (ctx: ProposeContext) => void;
  offchain: (ctx: ProposeContext) => void;
  onchain: (ctx: ProposeContext) => void;
  rejected: (ctx: ProposeContext) => void;
}

export const SubmitButton = (props: Props) => {
  return (
    <button
      className="px-2 py-1 text-gray-900 bg-sky-400 hover:text-black hover:bg-sky-500 rounded"
      onClick={() => {
        SubmitForm(props.error, props.offchain, props.onchain, props.rejected);
      }}
      type="button"
    >
      Propose Claim
    </button>
  );
};
