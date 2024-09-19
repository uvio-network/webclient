"use client";

import * as Separator from "@/components/layout/separator";

import { ClaimObject } from "@/modules/claim/ClaimObject";
import { UserStore } from "@/modules/user/UserStore";

interface Props {
  claim: ClaimObject;
}

export const ClaimFooterCardResolve = (props: Props) => {
  const probability = props.claim.votes().probability.toFixed(0);
  const selected = useSel(props.claim.samples());
  const total = Object.keys(props.claim.samples()).length;

  return (
    <div>
      {probability === "0" ? (
        <div>
          This resolution has not yet been voted on.
        </div>
      ) : (
        <div>
          This resolution was voted to be true by <strong>{probability}%</strong> of the voters, based on a total of {total} votes.
        </div>
      )}

      <div>
        <Separator.Horizontal />

        {selected === true ? (
          <div>
            You have been selected to vote in this resolution.
          </div>
        ) : (
          <div>
            You have not been selected to vote in this resolution.
          </div>
        )}
      </div>
    </div>
  );
};

const useSel = (sam: { [key: string]: string }): boolean => {
  const user = UserStore.getState().user;

  if (!user.valid || !user.object) {
    return false;
  }

  if (Object.values(sam).includes(user.object.id())) {
    return true;
  }

  return false;
};
