"use client";

import * as React from "react";

import { ClaimContent } from "@/components/claim/ClaimContent";
import { ClaimFooter } from "@/components/claim/ClaimFooter";
import { ClaimHeader } from "@/components/claim/ClaimHeader";
import { ClaimLabels } from "@/components/claim/ClaimLabels";
import { ClaimPage } from "@/modules/claim/ClaimPage";
import { ClaimTree } from "@/modules/claim/ClaimTree";
import { ClaimVoteButtons } from "@/components/claim/ClaimVoteButtons";
import { ClaimVoteButtonsOverlay } from "@/components/claim/ClaimVoteButtonsOverlay";
import { HorizontalSeparator } from "@/components/layout/HorizontalSeparator";
import { TrimWhitespace } from "@/modules/string/TrimWhitespace";
import { usePathname } from "next/navigation";
import { UserObject } from "@/modules/user/UserObject";
import { ClaimObject } from "@/modules/claim/ClaimObject";
import { BaseLabel } from "../label/BaseLabel";

interface Props {
  tree: ClaimTree;
  user: UserObject | undefined;
}

export const TreeContainer = (props: Props) => {
  const [current, setCurrent] = React.useState<ClaimObject>(props.tree.current());
  const [expand, setExpand] = React.useState<boolean>(false);

  const isSettled = current.isSettled();
  const isOwner = props.user && current.owner().id() === props.user.id() ? true : false;
  const isPage = ClaimPage(usePathname());
  const isPending = current.pending();

  const tglExpand = () => {
    setExpand((old: boolean) => !old);
  };

  return (
    <div
      className={TrimWhitespace(`
        relative w-full mb-6
      `)}
    >
      <div className="my-4">
        <ClaimHeader claim={current} />
      </div>

      <div className="my-4">
        <ClaimContent
          claim={current}
          editor={false}
          embed={false}
        />
      </div>

      {expand && (
        <div className="grid gap-y-4">
          {props.tree.claim().map((x: ClaimObject, i: number) => (
            <div
              key={x.id()}
              onClick={() => setCurrent(x)}
            >
              <BaseLabel
                className="cursor-pointer"
                color={x.lifecycle().color()}
                text={x.lifecycle().phase()}
              />
            </div>
          ))}
        </div>
      )}

      {isPage && (
        <ClaimLabels
          expand={tglExpand}
          labels={props.tree.propose().labels()}
          lifecycle={current.lifecycle()}
          pending={current.pending()}
        />
      )}

      <div className="relative h-px my-2">
        <HorizontalSeparator
          progress={current.pending() ? undefined : current.progress()}
          remaining={current.pending() ? undefined : current.remaining()}
        />
      </div>

      {!isSettled && isPage && (
        <>
          {!isPending && (
            <ClaimVoteButtons
              claim={current}
              user={props.user}
            />
          )}

          {(!isPending || (isPending && isOwner)) && (
            <ClaimVoteButtonsOverlay
              claim={current}
            />
          )}
        </>
      )}

      {!isSettled && (
        <ClaimFooter
          claim={current}
        />
      )}
    </div>
  );
};
