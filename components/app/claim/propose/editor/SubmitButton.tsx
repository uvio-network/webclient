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
      className="px-2 py-1 bg-blue-500 text-white rounded"
      onClick={() => {
        SubmitForm(props.error, props.offchain, props.onchain, props.rejected);
      }}
      type="button"
    >
      Propose Claim
    </button>
  );
};
