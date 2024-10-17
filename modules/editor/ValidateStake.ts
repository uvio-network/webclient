import * as ToastSender from "@/components/toast/ToastSender";

import { ChainStore } from "@/modules/chain/ChainStore";
import { EditorStore } from "@/modules/editor/EditorStore";
import { TokenStore } from "@/modules/token/TokenStore";

export const ValidateStake = (): boolean => {
  const chn = ChainStore.getState().getActive();
  const edi = EditorStore.getState();

  const amo = edi.getAmount();
  const sym = edi.getSymbol();
  const tok = edi.getToken();
  const lis = Object.keys(chn.tokens);

  {
    if (amo.num === 0 || sym === "") {
      return ToastSender.Error("Your staked reputation must be in the format [number token].");
    }
    if (amo.num === 0) {
      return ToastSender.Error("You must stake reputation with your claim.");
    }
    if (edi.propose !== undefined && sym !== edi.propose.token()) {
      return ToastSender.Error(`You can only stake the claim's token "${edi.propose.token()}".`);
    }
    if (tok === undefined) {
      return ToastSender.Error(`You can only stake one of the whitelisted tokens: ${lis}.`);
    }
    if (amo.num > avlBal(sym)) {
      return ToastSender.Error(`You do not seem to have enough tokens to stake ${amo.num} ${sym}.`);
    }
  }

  if (edi.isPropose() && edi.propose !== undefined) {
    const min = edi.propose.summary().post.minimum;

    if (amo.num < min) {
      return ToastSender.Error(`You must stake at least ${min.toFixed(tok.precision)} ${sym}.`);
    }
  }

  if (edi.isDispute() && edi.propose !== undefined) {
    const min = edi.propose.summary().post.minimum;

    if (amo.num < min * 2) {
      return ToastSender.Error(`You must stake at least ${(min * 2).toFixed(tok.precision)} ${sym}.`);
    }
  }

  return true;
};

const avlBal = (sym: string): number => {
  return TokenStore.getState().available[sym]?.balance || 0;
};
