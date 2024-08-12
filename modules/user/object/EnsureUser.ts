import { AuthStore } from "@/components/auth/AuthStore";
import { truncateEthAddress } from "@/modules/wallet/WalletAddress";
import { UserCreate } from "@/modules/api/user/create/Create";
import { UserSearch } from "@/modules/api/user/search/Search";

// EnsureUser creates a new user object in the apiserver if none exists already.
// If a user object does already exist for the given access token, then
// EnsureUser updates the user object with any state that changed meanwhile.
//
//     inp[0] the address of the smart contract wallet, or of the external signer
//     inp[1] the JWT access token identifying the user in the apiserver
//
export const EnsureUser = async (address: string, token: string) => {
  const req = {
    image: "",
    name: truncateEthAddress(address),
  };

  const [cre] = await UserCreate(token, [req]);
  const [sea] = await UserSearch(token, [{ id: cre.id }]);

  // TODO make this store a user object
  {
    AuthStore.getState().update({
      id: sea.id,
      image: sea.image,
      name: sea.name,
      token: token,
      valid: true,
    });
  }
};
