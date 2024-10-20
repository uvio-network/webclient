import * as React from "react";

import { ClaimObject } from "@/modules/claim/ClaimObject";
import { ClaimTree } from "@/modules/claim/ClaimTree";
import { CommentContainer } from "@/components/claim/CommentContainer";
import { LoadingStore } from "@/components/loading/LoadingStore";
import { NewClaimList } from "@/modules/claim/ClaimList";
import { NewClaimTree } from "@/modules/claim/ClaimTree";
import { PageHeader } from "@/components/layout/PageHeader";
import { PostSearchRequest } from "@/modules/api/post/search/Request";
import { QueryStore } from "@/modules/query/QueryStore";
import { TreeContainer } from "@/components/claim/TreeContainer";
import { useQuery } from "@tanstack/react-query";
import { UserStore } from "@/modules/user/UserStore";
import { useShallow } from "zustand/react/shallow";
import { VerticalSeparator } from "@/components/layout/VerticalSeparator";

interface Props {
  comments: boolean;
  query: string[];
  request: PostSearchRequest[];
}

export const ClaimList = (props: Props) => {
  const { authorizing } = LoadingStore(useShallow((state) => ({
    authorizing: state.authorizing,
  })));

  const { token, user, valid } = UserStore(useShallow((state) => ({
    token: state.token,
    user: state.object,
    valid: state.valid,
  })));

  const { query, updateClaim } = QueryStore.getState();

  const posts = useQuery({
    queryKey: [...props.query, "NewClaimList"],
    queryFn: async () => {
      return NewClaimTree(await NewClaimList(token, props.request));
    },
    enabled: !authorizing && valid,
    staleTime: 5000, // this prevents NewClaimList to be called multiple times
  }, query.client)

  updateClaim(() => {
    posts.refetch();
  });

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

  if (posts.data?.length === 0 && !posts.isPending) {
    return (
      <>
        no claims found
      </>
    );
  }

  return (
    <div>
      {posts.data?.map((x: ClaimTree, i: number) => (
        <div key={x.propose().id()}>
          <TreeContainer
            tree={x}
            user={user}
          />

          {i < posts.data?.length - 1 && (
            <div className="w-full h-12 mb-8">
              <VerticalSeparator />
            </div>
          )}

          {props.comments && (
            <>
              <PageHeader
                titl="Comments"
              />

              {x.comment().map((y: ClaimObject, i: number) => (
                <div key={y.id()}>
                  <CommentContainer
                    comment={y}
                  />

                  {i < x.comment().length - 1 && (
                    <div className="w-full h-12 mb-8">
                      <VerticalSeparator />
                    </div>
                  )}
                </div>
              ))}
            </>
          )}
        </div>
      ))}
    </div>
  );
};
