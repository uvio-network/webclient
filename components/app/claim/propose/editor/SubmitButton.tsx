import { ChainStore } from "@/modules/chain/ChainStore";
import { SubmitForm } from "@/modules/app/claim/propose/SubmitForm";
import { TokenStore } from "@/modules/token/TokenStore";
import { useRouter } from "next/navigation";
import { WalletStore } from "@/modules/wallet/WalletStore";

export const SubmitButton = () => {
  const router = useRouter();

  // TODO why aren't we pulling these dependencies inside of TokenStore.update() ???
  const chain = ChainStore.getState().getActive();
  const wallet = WalletStore.getState().wallet;

  return (
    <button
      className="flex-none px-1 bg-blue-500 text-white rounded"
      onClick={() => {
        SubmitForm((pos: string) => {
          TokenStore.getState().update(wallet, chain.tokens);
          router.push(`/claim/${pos}`);
        });
      }}
      type="button"
    >
      Propose Claim
    </button>
  );
};
