import * as ToastSender from "@/components/toast/ToastSender";

import { ChainStore } from "@/modules/chain/ChainStore";
import { CreatePost } from "@/modules/editor/CreatePost";
import { CreateVote } from "@/modules/editor/CreateVote";
import { ClaimsWithSymbol } from "@/modules/chain/ChainConfig";
import { ContractWithAddress } from "@/modules/chain/ChainConfig";
import { DeleteVote } from "@/modules/editor/DeleteVote";
import { DeletePost } from "@/modules/editor/DeletePost";
import { EditorStore } from "@/modules/editor/EditorStore";
import { ErrorMessage } from "@/modules/error/ErrorMessage";
import { ExecutePostTransactions } from "@/modules/editor/ExecutePostTransactions";
import { UpdatePost } from "@/modules/editor/UpdatePost";
import { UpdateVote } from "@/modules/editor/UpdateVote";
import { ValidateExpiry } from "@/modules/editor/ValidateExpiry";
import { ValidateLabels } from "@/modules/editor/ValidateLabels";
import { ValidateMarkdown } from "@/modules/editor/ValidateMarkdown";
import { ValidatePostTransactions } from "@/modules/editor/ValidatePostTransactions";
import { ValidateStake } from "@/modules/editor/ValidateStake";

interface Props {
  after: () => void;
  before: () => void;
  error: () => void;
  offchain: () => void;
  onchain: () => void;
  rejected: () => void;
  valid: () => void;
}

export const SubmitPost = async (props: Props) => {
  const chn = ChainStore.getState().getActive();
  const edi = EditorStore.getState();

  // Note that the order of the validation blocks below accomodates the user
  // experience when validating user input in the claim editor. The order of the
  // blocks below corresponds with the order of input fields on the claim create
  // page.
  {
    if (edi.kind === "claim") {
      if (!ValidateMarkdown()) return;
      if (!ValidateLabels()) return;
      if (!ValidateExpiry()) return;
      if (!ValidateStake()) return;
    }

    if (edi.kind === "comment") {
      if (!ValidateMarkdown()) return;
    }
  }

  {
    if (edi.kind === "claim") {
      if (edi.propose !== undefined && edi.propose.contract() as String !== "") {
        edi.updateClaims(ContractWithAddress(edi.propose.contract(), chn));
      } else if (edi.resolve !== undefined && edi.resolve.contract() as String !== "") {
        edi.updateClaims(ContractWithAddress(edi.resolve.contract(), chn));
      } else {
        edi.updateClaims(ClaimsWithSymbol(edi.getSymbol(), chn));
      }

      {
        edi.updateReference(await newHsh(edi.markdown));
      }
    }
  }

  try {
    // Before we create any resources, whether it is offchain or onchain, we
    // create the required transactions and simulate them to the best of our
    // abilities. If we cannot even simulate transactions, we have no business
    // creating any resources on behalf of the user.
    if (edi.kind === "claim") {
      await ValidatePostTransactions();
    }

    {
      props.valid();
    }

    if (edi.kind === "claim") {
      await CreatePost();
      await CreateVote();
    }

    if (edi.kind === "comment") {
      await CreatePost();
    }

    {
      props.offchain();
    }

    if (edi.kind === "claim") {
      await ExecutePostTransactions(props.before, props.after);
    }

    // Note that the receipt must be fetched from scratch since it only recently
    // got updated in the editor store. If we were to use the old editor message
    // instance, then we would get a stale copy that does not containn the
    // transaction receipt.
    if (EditorStore.getState().receipt.success === true || edi.kind === "comment") {
      if (edi.kind === "claim") {
        {
          await UpdatePost();
          await UpdateVote();
        }

        if (edi.isPropose()) {
          ToastSender.Success("Hooray, thy claim proposed milady!");
        }

        if (edi.isDispute()) {
          ToastSender.Success("That's a dispute for the history books!");
        }
      }

      if (edi.kind === "comment") {
        ToastSender.Success("Best comment ever!");
      }

      {
        props.onchain();
      }
    } else if (EditorStore.getState().receipt.rejected === true) {
      // If the user rejects the claim creation we can revert the system state
      // offchain. The vote object must then be deleted first, because it
      // requires the post object to exist in the backend in order to be
      // deleted.
      //
      // If the user rejects the confirmation of a pending claim, then we should
      // not delete those pending resources, because this pending state is
      // effectively what the user tries to confirm after all.
      if (!edi.pending) {
        await DeleteVote();
        await DeletePost();
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

const newHsh = async (str: string): Promise<string> => {
  const enc = new TextEncoder().encode(str);
  const buf = await window.crypto.subtle.digest("SHA-256", enc);
  const unt = Array.from(new Uint8Array(buf));
  const hsh = unt.map((b) => b.toString(16).padStart(2, "0")).join("");

  return hsh;
};
