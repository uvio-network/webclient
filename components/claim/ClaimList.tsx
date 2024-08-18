import * as Separator from "@/components/layout/separator";

import React from "react";

import { ClaimContainer } from "@/components/claim/ClaimContainer";
import { ClaimObject } from "@/modules/claim/ClaimObject";
import { ClaimIDs } from "@/modules/claim/ClaimList";
import { NewClaimList } from "@/modules/claim/ClaimList";
import { NewVoteList } from "@/modules/vote/VoteList";
import { LoadingStore } from "@/components/loading/LoadingStore";
import { PostSearchRequest } from "@/modules/api/post/search/Request";
import { QueryStore } from "@/modules/query/QueryStore";
import { useQuery } from "@tanstack/react-query";
import { UserStore } from "@/modules/user/UserStore";
import { useShallow } from "zustand/react/shallow";
import { VoteObject } from "@/modules/vote/VoteObject";

interface Props {
  page?: string;
  query: string[];
  request: PostSearchRequest[];
}

export const ClaimList = (props: Props) => {
  const { token, valid } = UserStore(useShallow((state) => ({
    token: state.user.token,
    valid: state.user.valid,
  })));

  const { query, updateClaim } = QueryStore.getState();

  const posts = useQuery({
    queryKey: [...props.query, "NewClaimList"],
    queryFn: async () => {
      return await NewClaimList(props.request);
    },
  }, query.client)

  // Fetching the votes of the authenticated user is conditional and depends on
  // the auth token, and the result of the claims query above.
  const votes = useQuery({
    queryKey: [...props.query, "NewVoteList"],
    queryFn: async () => {
      return await NewVoteList(token, ClaimIDs(posts.data || []));
    },
    enabled: valid && !posts.isPending && posts.data?.length !== 0 ? true : false,
  }, query.client)

  updateClaim(() => {
    posts.refetch();
    votes.refetch();
  });

  // We search for posts in all kinds of variations in this component. For one,
  // we want to always work with a list of posts, even if it is empty. So getLis
  // does that for us. And then, we have to account for pages rendered with or
  // without comments. If we are tasked to render a claim page, and the post to
  // render is in fact a comment, then we remove the parent claim from the
  // search response in order to only forward the post of kind "comment". Note
  // that search queries are automatically extended at the moment in order to
  // provide claims with comments and comments with their parent claims. This
  // automatic extension is the reason for our filtering efforts here.
  const list = getLis(posts.data || [], votes.data || [], props.page || "");

  // We want to embed claims on comment posts on basically every page, except on
  // the claim page where we show claims and their comments underneath. So if we
  // render the claim page, then negate the condition below and use the result
  // as boolean flag to embed claims everywhere else but here.
  const embed = !(list.length >= 1 && list[0].id() === props.page && list[0].kind() === "claim");

  {
    const { loaded, loading } = LoadingStore();

    React.useEffect(() => {
      if (!posts.isPending) {
        loaded();
      }
    }, [posts.isPending]);

    if (loading) return <></>;
  }

  return (
    <div>
      {list.length === 0 && !posts.isPending && (
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

const getLis = (cla: ClaimObject[], vot: VoteObject[], pag: string): ClaimObject[] => {
  cla = ordPos(cla, pag);
  cla = mrgLis(cla, vot);
  return cla;
};

// mrgLis produces a new array of updated claim objects according to the
// matching vote objects as provided.
const mrgLis = (cla: ClaimObject[], vot: VoteObject[]): ClaimObject[] => {
  if (!vot || vot.length === 0) {
    return cla;
  }

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

// ordPos ensures the order of post objects according to the page we are
// supposed to render.
const ordPos = (cla: ClaimObject[], pag: string): ClaimObject[] => {
  if (!pag || pag === "") {
    return cla;
  }

  for (const x of cla) {
    if (x.kind() === "comment" && x.id() === pag) {
      return [x];
    }
  }

  const lis: ClaimObject[] = [];
  for (const x of cla) {
    if (x.kind() === "claim" && x.id() === pag) {
      lis.push(x);
      break;
    }
  }

  for (const x of cla) {
    if (lis[0].id() !== x.id()) {
      lis.push(x);
    }
  }

  return lis;
};
