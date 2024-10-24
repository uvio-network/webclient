import * as React from "react";

import { ClaimObject } from "@/modules/claim/ClaimObject";
import { EditorStore } from "@/modules/editor/EditorStore";
import { TrimWhitespace } from "@/modules/string/TrimWhitespace";
import { WindowStore } from "@/modules/window/WindowStore";

interface Props {
  claim: ClaimObject;
}

export const ClaimVoteValue = (props: Props) => {
  const def = defVal(props.claim);

  React.useEffect(() => {
    // Ensure we set the stake property according to any pending staking value
    // on page load, if any.
    if (def !== "") {
      EditorStore.getState().updateStake(def);
    }
  }, [def]);

  // The value field here has only one purpose, allowing the user to cancel the
  // verification using the ESC key.
  if (props.claim.isResolve()) {
    // Resolves should not render the focussed input field on mobile for two
    // reasons.
    //
    //     1. On mobile the virtual keyboard pops up if an input field has
    //        focus. Doing that without having any input field to work with
    //        doesn't make any sense.
    //
    //     2. On mobile there is no escape key to close the button overlay. So
    //        rendering the input field doesn't make any sense, because it can't
    //        be used for its intended purpose anyway.
    //
    if (!WindowStore.getState().breakpoint) {
      return <></>;
    }

    return (
      <input
        style={{
          position: "absolute",
          opacity: 0,
          width: 0,
          height: 0,
          pointerEvents: "none"
        }}
        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
          if (e.key === "Escape") {
            EditorStore.getState().updateOverlay(false);
          }
        }}
        autoFocus={true}
        type="text"
      />
    );
  }

  return (
    <input
      className={TrimWhitespace(`
        w-full h-full p-2 bg-transparent
        border-b-2 border-sky-400 outline-none disabled:cursor-not-allowed
        placeholder:text-gray-400 placeholder:dark:text-gray-500
        text-4xl font-light text-right caret-sky-400
      `)}
      disabled={def !== ""}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        EditorStore.getState().updateStake(ensTok(e.currentTarget.value, props.claim.token()));
      }}
      onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Escape") {
          EditorStore.getState().updateOverlay(false);
        }
      }}
      placeholder={plcHld(props.claim)}
      defaultValue={def}
      autoFocus={true}
      type="text"
    />
  );
};

const defVal = (cla: ClaimObject): string => {
  const pre = cla.precision();
  const vot = cla.latestVote();

  if (cla.pending()) {
    const min = cla.summary().post.minimum;

    if (min > 0) {
      return `${min.toFixed(pre)} ${cla.token()}`;
    }

    const val = vot.value();

    if (val > 0) {
      return `${val.toFixed(pre)} ${cla.token()}`;
    }
  }

  if (vot.pending()) {
    if (vot.value() > 0) {
      return `${vot.value().toFixed(pre)} ${cla.token()}`;
    }
  }

  return "";
};

const ensTok = (inp: string, tok: string): string => {
  const spl = TrimWhitespace(inp).split(" ");

  if (!spl || spl.length >= 2) {
    return inp;
  }

  return `${inp} ${tok}`;
};

const plcHld = (cla: ClaimObject): string => {
  const min = cla.summary().post.minimum;

  if (min) {
    return `${min.toFixed(cla.precision())} ${cla.token()}`;
  }

  return "10.00 UVX";
};
