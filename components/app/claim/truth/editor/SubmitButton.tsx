import { SubmitForm } from "@/modules/app/claim/truth/SubmitForm";
import { ToTitle } from "@/modules/string/ToTitle";
import { TruthContext } from "@/modules/context/TruthContext";

interface Props {
  open: string;
  error: (ctx: TruthContext) => void;
  offchain: (ctx: TruthContext) => void;
  onchain: (ctx: TruthContext) => void;
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
      Verify with {ToTitle(props.open)}
    </button>
  );
};
