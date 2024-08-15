import { SubmitForm } from "@/modules/app/claim/stake/SubmitForm";

interface Props {
  onSuccess: (vot: string, tok: string, amo: number) => void;
}

export const SubmitButton = (props: Props) => {
  return (
    <button
      className="p-4 w-full rounded text-gray-900 hover:text-black bg-sky-400 hover:bg-sky-500"
      type="button"
      onClick={() => {
        SubmitForm(props.onSuccess);
      }}
    >
      Stake Reputation
    </button>
  );
};
