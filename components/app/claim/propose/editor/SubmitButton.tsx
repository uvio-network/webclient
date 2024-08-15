import { SubmitForm } from "@/modules/app/claim/propose/SubmitForm";

interface Props {
  onSuccess: (pos: string, vot: string, tok: string, amo: number) => void;
}

export const SubmitButton = (props: Props) => {
  return (
    <button
      className="flex-none px-1 bg-blue-500 text-white rounded"
      onClick={() => {
        SubmitForm(props.onSuccess);
      }}
      type="button"
    >
      Propose Claim
    </button>
  );
};
