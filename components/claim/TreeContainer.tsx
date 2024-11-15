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

  const isPage = claimPage !== "";

  const isClaimOwner = props.user && current.owner().id() === props.user.id() ? true : false;
  const isClaimPending = current.pending();

  const isVoteOwner = props.user && current.latestVote().owner() === props.user.id() ? true : false;
  const isVotePending = current.pendingVote();

  const isResolve = current.isResolve();
  const isSettled = current.isSettled();

  React.useEffect(() => {
    setCurrent(props.tree.current(claimPage));
  }, [props.tree, claimPage]);

  return (
    <div className="relative w-full mb-6">
      <div className="my-4">
        <ClaimHeader
          claim={current}
          latest={props.tree.latest(current)}
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
                  "**true**": bldStr,
                  "**false**": bldStr,
                  "**valid**": bldStr,
                  "**invalid**": bldStr,
                  "**you**": bldStr,
                },
              )
            }} />
          }
        />
      )}

      <div className="flex my-4">
        <ClaimLifecycleMenu
          claims={isPage ? props.tree.claims() : [current]}
          current={current}
          link={isPage ? "" : `/claim/${current.id()}`}
          setCurrent={setCurrent}
        />

        <LabelList
          labels={props.tree.propose().labels()}
          target={undefined}
        />
      </div>

      <div className="relative h-px my-2">
        <HorizontalSeparator
          progress={current.pending() ? undefined : current.progress()}
          remaining={current.pending() ? undefined : current.remaining()}
        />
      </div>

      {!isSettled && isPage && (
        <>
          {!isClaimPending && (
            <ClaimVoteButtons
              claim={current}
              user={props.user}
            />
          )}

          {((!isClaimPending && !isVotePending) || (isClaimPending && isClaimOwner) || (isVotePending && isVoteOwner)) && (
            <ClaimVoteButtonsOverlay
              claim={current}
            />
          )}
        </>
      )}

      {!isSettled && (
        <ClaimFooter
          claim={current}
          comments={props.tree.comment().length}
        />
      )}
    </div>
  );
};

const bldStr = (x: string): string => {
  return `<strong>${x.replace(/\*\*/g, "")}</strong>`;
};
