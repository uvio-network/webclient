import * as Separator from "@/components/layout/separator";

import React from "react";

import { AuthStore } from "@/components/auth/AuthStore";
import { ClaimContainer } from "@/components/claim/ClaimContainer";
import { ClaimObject } from "@/modules/claim/object/ClaimObject";
import { ClaimIDs, CreateClaimList } from "@/modules/claim/object/ClaimList";
import { CreateVoteList } from "@/modules/vote/object/VoteList";
import { PostSearchRequest } from "@/modules/api/post/search/Request";
import { QueryStore } from "@/modules/query/QueryStore";
import { useQuery } from "@tanstack/react-query";
import { useShallow } from "zustand/react/shallow";
import { VoteObject } from "@/modules/vote/object/VoteObject";

interface Props {
  page?: string;
  query: string[];
  request: PostSearchRequest[];
}

export const ClaimList = (props: Props) => {
  const query = QueryStore.getState();

  const { token, valid } = AuthStore(useShallow((state) => ({
    token: state.auth.token,
    valid: state.auth.valid,
  })));

  const claims = useQuery({
    queryKey: [...props.query, "CreateClaimList"],
    queryFn: async () => {
      return await CreateClaimList(props.request);
    },
  })

  // Fetching the votes of the authenticated user is conditional and depends on
  // the auth token, and the result of the claims query above.
  const votes = useQuery({
    queryKey: [...props.query, "CreateVoteList"],
    queryFn: async () => {
      return await CreateVoteList(token, ClaimIDs(claims.data || []));
    },
    enabled: valid && !claims.isPending && claims.data?.length !== 0 ? true : false,
  })

  query.updateClaim({
    refresh: () => {
      claims.refetch();
      votes.refetch();
    },
  });

  const list = getLis(claims.data, votes.data, props.page || "");

  // We want to embed claims on comment posts on basically every page, except on
  // the claim page where we show claims and their comments underneath. So if we
  // render the claim page, then negate the condition below and use the result
  // as boolean flag to embed claims everywhere else but here.
  const embed = !(list.length >= 1 && list[0].id() === props.page && list[0].kind() === "claim");

  return (
    <div>
      {list.length === 0 && (
        <>
          no claims found
        </>
      )}

      {list.map((x: ClaimObject, i: number) => (
        <div key={x.id()}>
          <ClaimContainer
            claim={x}
            embed={embed}
          />

          {/*
          Show a vertical separator between claims and make sure that the last
          claim does not display a separator anymore.
          */}
          {i < list.length - 1 && (
            <div className="w-full h-12 mb-8">
              <Separator.Vertical />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

const getLis = (cla: ClaimObject[] | undefined, vot: VoteObject[] | undefined, pag: string): ClaimObject[] => {
  if (cla && pag) return selPos(cla, pag);
  if (cla && !vot) return cla;
  if (cla && vot) return mrgLis(cla, vot);
  return [];
};

// mrgLis produces a new array of updated claim objects according to the
// matching vote objects as provided.
const mrgLis = (cla: ClaimObject[], vot: VoteObject[]): ClaimObject[] => {
  const map: Map<string, VoteObject[]> = new Map();

  for (const x of vot) {
    const l = map.get(x.claim()) || [];
    l.push(x);
    map.set(x.claim(), l);
  }

  const lis: ClaimObject[] = [];

  for (const x of cla) {
    const l = map.get(x.id())?.map((y) => (y.getVote()));

    lis.push(new ClaimObject(
      x.getPost(),
      x.getUser(),
      x.getPrnt(),
      l || [],
    ));
  }

  return lis;
};

const selPos = (cla: ClaimObject[], pag: string): ClaimObject[] => {
  for (const x of cla) {
    if (x.kind() === "comment" && x.id() === pag) {
      return [x];
    }
  }

  return cla;
};
