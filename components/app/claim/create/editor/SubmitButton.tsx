import { SubmitForm } from "@/modules/app/claim/create/form/SubmitForm";

export const SubmitButton = () => {
  return (
    <button
      className="flex-none px-1 bg-blue-500 text-white rounded"
      onClick={SubmitForm}
      type="button"
    >
      Propose Claim
    </button>
  );
};
