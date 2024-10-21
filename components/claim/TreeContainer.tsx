"use client";

import * as React from "react";

import { ClaimContent } from "@/components/claim/ClaimContent";
import { ClaimFooter } from "@/components/claim/ClaimFooter";
import { ClaimHeader } from "@/components/claim/ClaimHeader";
import { ClaimLifecycleMenu } from "@/components/claim/ClaimLifecycleMenu";
import { ClaimObject } from "@/modules/claim/ClaimObject";
import { ClaimPage } from "@/modules/claim/ClaimPage";
import { ClaimTree } from "@/modules/claim/ClaimTree";
import { ClaimVoteButtons } from "@/components/claim/ClaimVoteButtons";
import { ClaimVoteButtonsOverlay } from "@/components/claim/ClaimVoteButtonsOverlay";
import { HorizontalSeparator } from "@/components/layout/HorizontalSeparator";
import { InfoCard } from "@/components/card/InfoCard";
import { LabelList } from "@/components/label/LabelList";
import { TrimWhitespace } from "@/modules/string/TrimWhitespace";
import { usePathname } from "next/navigation";
import { UserObject } from "@/modules/user/UserObject";
import { ProcessString } from "@/modules/string/ProcessString";

interface Props {
  tree: ClaimTree;
  user: UserObject | undefined;
}

export const TreeContainer = (props: Props) => {
  const claimPage = ClaimPage(usePathname());

  const [current, setCurrent] = React.useState<ClaimObject>(props.tree.current(claimPage));

  const isOwner = props.user && current.owner().id() === props.user.id() ? true : false;
  const isPage = claimPage !== "";
  const isPending = current.pending();
  const isResolve = current.isResolve();
  const isSettled = current.isSettled();

  return (
    <div
      className={TrimWhitespace(`
        relative w-full mb-6
      `)}
    >
      <div className="my-4">
        <ClaimHeader
          claim={props.tree.latest()}
        />
      </div>

      <div className="my-4">
        <ClaimContent
          claim={props.tree.current().id()}
          editor={false}
          embed={false}
          markdown={props.tree.latest().markdown()}
        />
      </div>

      {isPage && (isResolve || isSettled) && (
        <InfoCard
          close={false}
          color="gray"
          text={
            <span dangerouslySetInnerHTML={{
              __html: ProcessString(
                current.markdown(),
                {
                  "true": bldStr,
                  "false": bldStr,
                  "valid": bldStr,
                  "invalid": bldStr,
                },
              )
            }} />
          }
        />
      )}

      {isPage && (
        <div className="flex my-4">
          <ClaimLifecycleMenu
            claims={props.tree.claims()}
            current={current}
            setCurrent={setCurrent}
          />

          <LabelList
            labels={props.tree.propose().labels()}
            target={undefined}
          />
        </div>
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

const bldStr = (x: string): string => {
  return `<strong>${x}</strong>`;
};
