import * as Separator from "@/components/layout/separator";

import React from "react";

import { AuthStore } from "@/components/auth/AuthStore";
import { ClaimContainer } from "@/components/claim/ClaimContainer";
import { ClaimObject } from "@/modules/claim/object/ClaimObject";
import { NewClaimList } from "@/modules/claim/object/ClaimList";
import { PostSearchRequest } from "@/modules/api/post/search/Request";

interface Props {
  request: PostSearchRequest[]
}

export const ClaimList = (props: Props) => {
  const [claims, setClaims] = React.useState<ClaimObject[] | null>(null);

  React.useEffect(() => {
    const fetchData = async () => {
      setClaims(
        await NewClaimList(AuthStore.getState().auth.token, props.request),
      );
    };

    {
      fetchData();
    }
  }, []);

  if (claims === null) {
    return <></>;
  }

  if (claims.length === 0) {
    return <div>no claims found</div>;
  }

  return (
    <div>
      {claims.map((x: ClaimObject, i: number) => (
        <div key={x.id()}>
          <ClaimContainer claim={x} />

          {/*
          Show a vertical separator between claims and make sure that the last
          claim does not display a separator anymore.
          */}
          {i < claims.length - 1 && (
            <div className="w-full h-12 mb-8">
              <Separator.Vertical />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
