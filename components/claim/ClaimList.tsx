import * as React from "react";
import * as Separator from "@/components/layout/separator";

import { ClaimContainer } from "@/components/claim/ClaimContainer";
import { ClaimObject } from "@/modules/claim/ClaimObject";
import { ClaimStore } from "@/modules/claim/ClaimStore";
import { NewClaimList } from "@/modules/claim/ClaimList";
import { LoadingStore } from "@/components/loading/LoadingStore";
import { PostSearchRequest } from "@/modules/api/post/search/Request";
import { QueryStore } from "@/modules/query/QueryStore";
import { useQuery } from "@tanstack/react-query";
import { UserStore } from "@/modules/user/UserStore";
import { useShallow } from "zustand/react/shallow";

interface Props {
  filter?: (cla: ClaimObject) => boolean;
  query: string[];
  request: PostSearchRequest[];
}

export const ClaimList = (props: Props) => {
  const { authorizing } = LoadingStore(useShallow((state) => ({
    authorizing: state.authorizing,
  })));

  const { token, user, valid } = UserStore(useShallow((state) => ({
    token: state.user.token,
    user: state.user.object,
    valid: state.user.valid,
  })));

  const { query, updateClaim } = QueryStore.getState();

  const posts = useQuery({
    queryKey: [...props.query, "NewClaimList"],
    queryFn: async () => {
      return await NewClaimList(token, props.request);
    },
    enabled: !authorizing && valid,
    staleTime: 5000, // this prevents NewClaimList to be called multiple times
  }, query.client)

  updateClaim(() => {
    posts.refetch();
  });

  // We search for posts in all kinds of variations in this component. For one,
  // getLis gives us a list of posts, which is easier to work with below, even
  // if it is empty. And then, we have to account for pages rendered with or
  // without comments. If we are tasked to render a claims page, and the post to
  // render is in fact a comment, then we only render the comment itself.
  const list = filLis(getLis(posts.data || [], props.query), props.filter);

  React.useEffect(() => {
    if (list.length !== 0) {
      if (props.query.join("-").startsWith("claim-id")) {
        ClaimStore.getState().updateTree(list[0].tree());
      } else {
        ClaimStore.getState().delete();
      }
    }
  }, [list, props.query]);

  {
    const { loaded, loading } = LoadingStore();

    React.useEffect(() => {
      if (!posts.isPending) {
        loaded();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
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
            user={user}
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

// filLis applies a filter function to the given list of claims, if such a
// filter is provided. If not, the given list of claims is returned as is.
const filLis = (cla: ClaimObject[], fil: ((cla: ClaimObject) => boolean) | undefined): ClaimObject[] => {
  if (fil !== undefined) {
    return cla.filter(fil);
  }

  return cla;
};

// getLis ensures the order of post objects according to the page we are
// supposed to render.
const getLis = (cla: ClaimObject[], qry: string[]): ClaimObject[] => {
  const pag = qry.join("-").startsWith("claim-id") ? qry[2] : "";

  if (pag === "") {
    for (const x of cla) {
      // On the timeline, every claim is allowed to embed once, if a parent
      // exists.
      if (x.kind() == "claim") {
        x.setEmbd(1);
      }

      // On the timeline, every comment is allowed to embed twice, to the extend
      // that those parents exists.
      if (x.kind() == "comment") {
        x.setEmbd(2);
      }
    }

    return cla;
  }

  // If we are rendering a single comment on the comment page, then only return
  // the comment object itself.
  for (const x of cla) {
    if (x.kind() === "comment" && x.id() === pag) {
      x.setEmbd(2);
      return [x];
    }
  }

  const lis: ClaimObject[] = [];

  // If we are rendering a dedicated claims page, then put the claim of this
  // page at the top.
  for (const x of cla) {
    if (x.kind() === "claim" && x.id() === pag) {
      x.setEmbd(2);
      lis.push(x);
      break;
    }
  }

  const fir = lis[0];

  for (const x of cla) {
    // Do not add the claim again that we have already added at the top of this
    // list.
    if (fir.id() === x.id()) {
      continue
    }

    // Do not add the parent of the first claim, because the first claim has its
    // parent already embedded.
    if (fir.parent()?.id() === x.id()) {
      continue
    }

    {
      lis.push(x);
    }
  }

  return lis;
};
