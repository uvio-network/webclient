import { truncateEthAddress } from "@/modules/wallet/WalletAddress";
import { UserObject } from "@/modules/user/UserObject";
import { UserCreate } from "@/modules/api/user/create/Create";
import { UserSearch } from "@/modules/api/user/search/Search";
import { UserStore } from "@/modules/user/UserStore";

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

  {
    UserStore.getState().update({
      object: new UserObject(sea),
      token: token,
      valid: true,
    });
  }
};
