"use client";

import * as Separator from "@/components/layout/separator";

import { ClaimObject } from "@/modules/claim/ClaimObject";

interface Props {
  claim: ClaimObject;
}

export const ClaimFooterCardResolve = (props: Props) => {
  const current = props.claim.sumary().total;
  const selected = props.claim.selected();
  const total = Object.keys(props.claim.samples()).length;

  const percentage = ((current / total) * 100).toFixed(0);

  const voteTrue = props.claim.upside().stake[0];
  const voteFalse = props.claim.upside().stake[1];

  return (
    <div>
      {current === 0 ? (
        <div>
          This resolution has not yet been voted on.
        </div>
      ) : (
        <div>
          This resolution was voted to be true by <strong>{percentage}%</strong> of the voters, based on a total of {total} votes.
        </div>
      )}

      <div>
        <Separator.Horizontal />

        {selected === true ? (
          <>
            {voteTrue === 0 && voteFalse === 0 && (
              <div>
                You have been selected to vote on this resolution.
              </div>
            )}

            {voteTrue !== 0 && (
              <div>
                You voted for the associated claim to be <strong>true</strong>.
              </div>
            )}

            {voteFalse !== 0 && (
              <div>
                You voted for the associated claim to be <strong>false</strong>.
              </div>
            )}
          </>
        ) : (
          <div>
            You have not been selected to vote on this resolution.
          </div>
        )}
      </div>
    </div>
  );
};
