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

  React.useEffect(() => {
    {
      EditorStore.getState().updateKind(props.Kind);
    }

    if (props.Kind === "claim") {
      EditorStore.getState().updateOption(true);
    }
  }, [props.Kind]);

  return (
    <div>
      <EditorButtonGroup write={write} setWrite={setWrite} />
      <EditorMarkdown write={write} claim={undefined} />

      {props.Kind === "claim" && (
        <>
          <EditorLabels write={write} />

          <div className="flex">
            <div className="basis-3/4">
              <EditorExpiry />
            </div>
            <div className="basis-1/4">
              {props.EditorStake && React.cloneElement(props.EditorStake, {})}
            </div>
          </div>
        </>
      )}

      <button
        className={`
          flex items-center justify-center my-1 px-2 py-1 sm:py-4 w-full h-full rounded
          ${disabled ? "text-gray-700 bg-sky-300 cursor-not-allowed" : "text-gray-900 bg-sky-400 hover:text-black hover:bg-sky-500"}
        `}
        disabled={disabled}
        type="button"
        onClick={() => {
          SubmitPost({
            after: () => {
              if (props.Kind === "claim") {
                setProcessing("Confirming Onchain");
              }
            },
            before: () => {
              //
            },
            valid: () => {
              setDisabled(true);

              if (props.Kind === "claim") {
                setProcessing("Signing Transaction");
              } else {
                setProcessing("Posting Comment");
              }
            },
            error: () => {
              setDisabled(false);
              setProcessing("");

              const pos = EditorStore.getState().post;

              if (pos.id !== "") {
                useRouter().push(`/claim/${pos.id}`);
              }
            },
            offchain: () => {
              //
            },
            onchain: () => {
              setDisabled(false);
              setProcessing("");

              const pos = EditorStore.getState().post;

              if (pos.id !== "") {
                useRouter().push(`/claim/${pos.id}`);
              }

              TokenStore.getState().updateBalance();
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
