import * as ToastSender from "@/components/toast/ToastSender";

import { ChainStore } from "@/modules/chain/ChainStore";
import { ContractWithAddress } from "@/modules/chain/ChainConfig";
import { CreateVote } from "@/modules/editor/CreateVote";
import { DeleteVote } from "@/modules/editor/DeleteVote";
import { EditorStore } from "@/modules/editor/EditorStore";
import { ErrorMessage } from "@/modules/error/ErrorMessage";
import { ExecuteVoteTransactions } from "@/modules/editor/ExecuteVoteTransactions";
import { UpdateVote } from "@/modules/editor/UpdateVote";
import { ValidateStake } from "@/modules/editor/ValidateStake";
import { ValidateVoteTransactions } from "@/modules/editor/ValidateVoteTransactions";

interface Props {
  after: () => void;
  before: () => void;
  error: () => void;
  offchain: () => void;
  onchain: () => void;
  rejected: () => void;
  valid: () => void;
}

export const SubmitVote = async (props: Props) => {
  const chn = ChainStore.getState().getActive();
  const edi = EditorStore.getState();

  {
    if (edi.kind === "stake") {
      if (!ValidateStake()) return props.rejected();
    }
  }

  try {
    {
      if (edi.propose !== undefined && edi.propose.contract() as String !== "") {
        edi.updateClaims(ContractWithAddress(edi.propose.contract(), chn));
      }
    }

    // Before we create any resources, whether it is offchain or onchain, we
    // create the required transactions and simulate them to the best of our
    // abilities. If we cannot even simulate transactions, we have no business
    // creating any resources on behalf of the user.
    {
      await ValidateVoteTransactions();
    }

    {
      props.valid();
    }

    {
      await CreateVote();
    }

    {
      props.offchain();
    }

    {
      await ExecuteVoteTransactions(props.before, props.after);
    }

    // Note that the receipt must be fetched from scratch since it only recently
    // got updated in the editor store. If we were to use the old editor message
    // instance, then we would get a stale copy that does not containn the
    // transaction receipt.
    if (EditorStore.getState().receipt.success === true) {
      {
        await UpdateVote();
      }

      if (edi.kind === "stake") {
        ToastSender.Success("Certified, you staked the shit out of that claim!");
      }
      if (edi.kind === "truth") {
        ToastSender.Success("Heareth heareth, let there truth be told!");
      }

      {
        props.onchain();
      }
    } else if (EditorStore.getState().receipt.rejected === true) {
      // If the user rejects the confirmation of a pending vote, then we should
      // not delete this pending resource, because this pending state is
      // effectively what the user tries to confirm after all.
      if (!edi.pending) {
        await DeleteVote();
      }

      {
        ToastSender.Info("No biggie darling, we'll take it back.");
      }

      {
        props.rejected();
      }
    } else {
      {
        ToastSender.Error("Ohh, nope, that was not good enough!");
      }

      {
        props.error();
      }
    }
  } catch (err) {
    console.error(err);
    ToastSender.Error(ErrorMessage(err));
    props.error();
  }
};
