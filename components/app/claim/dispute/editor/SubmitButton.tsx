import { DisputeContext } from "@/modules/context/DisputeContext";
import { SubmitForm } from "@/modules/app/claim/dispute/SubmitForm";

interface Props {
  error: (ctx: DisputeContext) => void;
  offchain: (ctx: DisputeContext) => void;
  onchain: (ctx: DisputeContext) => void;
  rejected: (ctx: DisputeContext) => void;
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
      Create Dispute
    </button>
  );
};
