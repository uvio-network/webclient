import * as React from "react";

import { ClaimObject } from "@/modules/claim/ClaimObject";
import { EditorStore } from "@/modules/editor/EditorStore";
import { TrimWhitespace } from "@/modules/string/TrimWhitespace";

interface Props {
  claim: ClaimObject;
}

export const ClaimVoteValue = (props: Props) => {
  const def = defVal(props.claim);

  React.useEffect(() => {
    if (def !== "") {
      EditorStore.getState().updateStake(def);
    }
  }, [def]);

  // The value field here has only one purpose, allowing the user to cancel the
  // verification using the ESC key.
  if (props.claim.lifecycle() === "resolve") {
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
        border-b-2 border-sky-400 outline-none
        placeholder:text-gray-400 placeholder:dark:text-gray-500
        text-2xl sm:text-4xl font-light text-right caret-sky-400
      `)}
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
  if (cla.pending()) {
    const vot = cla.getVote();

    if (vot.length !== 0) {
      return `${vot[0].value} ${cla.token()}`;
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
    return `${min} ${cla.token()}`;
  }

  return defVal(cla);
};
