import { SubmitForm } from "@/modules/app/claim/comment/SubmitForm";
import { useRouter } from "next/navigation";

export const SubmitButton = () => {
  const router = useRouter();

  return (
    <button
      className="px-1 bg-blue-500 text-white rounded"
      onClick={() => {
        SubmitForm((cla: string, com: string) => router.push(`/claim/${com}`));
      }}
      type="button"
    >
      Create Comment
    </button>
  );
};
