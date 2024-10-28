"use client";

import * as React from "react";

import { EditorButtonGroup } from "@/components/editor/EditorButtonGroup";
import { EditorExpiry } from "@/components/editor/EditorExpiry";
import { EditorLabels } from "@/components/editor/EditorLabels";
import { EditorMarkdown } from "@/components/editor/EditorMarkdown";
import { EditorStore } from "@/modules/editor/EditorStore";
import { SpinnerIcon } from "@/components/icon/SpinnerIcon";
import { SubmitPost } from "@/modules/editor/SubmitPost";
import { TokenStore } from "@/modules/token/TokenStore";
import { useRouter } from "next/navigation";
import { useShallow } from "zustand/react/shallow";

interface Props {
  EditorStake: React.ReactElement | undefined;
  InfoCard: React.ReactElement | undefined;
  Kind: string;
  SendButtonTitle: string;
}

export const EditorForm = (props: Props) => {
  const [disabled, setDisabled] = React.useState<boolean>(false);
  const [processing, setProcessing] = React.useState<string>("");
  const [write, setWrite] = React.useState<boolean>(true);

  const { parent, resolve } = EditorStore(useShallow((state) => ({
    parent: state.parent,   // if comment
    resolve: state.resolve, // if dispute
  })));

  const router = useRouter();

  React.useEffect(() => {
    {
      EditorStore.getState().updateKind(props.Kind);
    }

    if (props.Kind === "claim") {
      if (EditorStore.getState().isDispute()) {
        EditorStore.getState().updateOption(!EditorStore.getState().resolve.side()); // invert for dispute
      } else {
        EditorStore.getState().updateOption(true); // always true for propose
      }
    }

  }, [props.Kind]);

  return (
    <div>
      <EditorButtonGroup write={write} setWrite={setWrite} />
      <EditorMarkdown write={write} claim={parent || resolve} />

      {props.Kind === "claim" && (
        <>
          <EditorLabels write={write} />

          <div className="flex">
            <div className="basis-3/5">
              <EditorExpiry />
            </div>
            <div className="basis-2/5">
              {props.EditorStake && React.cloneElement(props.EditorStake, {})}
            </div>
          </div>
        </>
      )}

      <button
        className={`
          flex items-center justify-center my-1 px-2 py-4 w-full h-full rounded
          ${disabled ? "text-gray-700 bg-sky-300 cursor-not-allowed" : "text-gray-900 bg-sky-400 hover:text-black hover:bg-sky-500"}
        `}
        disabled={disabled}
        type="button"
        onClick={() => {
          {
            setDisabled(true);
          }

          if (props.Kind === "claim") {
            setProcessing("Signing Transaction");
          } else {
            setProcessing("Posting Comment");
          }

          SubmitPost({
            after: () => {
              if (props.Kind === "claim") {
                setProcessing("Confirming Onchain");
              }
            },
            before: () => {
              //
            },
            error: () => {
              const edi = EditorStore.getState();

              if (edi.post !== undefined && edi.post.id !== "") {
                router.push(`/claim/${edi.post.id}`);
              }

              setDisabled(false);
              setProcessing("");
            },
            offchain: () => {
              //
            },
            onchain: () => {
              const edi = EditorStore.getState();

              if (edi.post !== undefined && edi.post.id !== "") {
                router.push(`/claim/${edi.post.id}`);
              }

              setDisabled(false);
              setProcessing("");

              EditorStore.getState().delete();
              TokenStore.getState().updateBalance();
            },
            rejected: () => {
              setDisabled(false);
              setProcessing("");
            },
            valid: () => {
              //
            },
          });
        }}
      >
        <>
          {processing ? (
            <div className="flex gap-x-2">
              <div className="flex my-auto">
                <SpinnerIcon textColour="text-gray-700" />
              </div>

              <div className="flex">
                {processing}
              </div>
            </div>
          ) : (
            <div>
              {props.SendButtonTitle}
            </div>
          )}
        </>
      </button>

      {props.InfoCard && React.cloneElement(props.InfoCard, {})}
    </div >
  );
};
