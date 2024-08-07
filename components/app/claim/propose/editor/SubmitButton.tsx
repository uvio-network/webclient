import { SubmitForm } from "@/modules/app/claim/propose/SubmitForm";
import { useRouter } from "next/navigation";

export const SubmitButton = () => {
  const router = useRouter();

  return (
    <button
      className="flex-none px-1 bg-blue-500 text-white rounded"
      onClick={() => {
        SubmitForm((pos: string) => router.push(`/claim/${pos}`));
      }}
      type="button"
    >
      Propose Claim
    </button>
  );
};
