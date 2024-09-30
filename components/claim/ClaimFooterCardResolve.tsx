"use client";

import * as Separator from "@/components/layout/separator";

import { ClaimObject } from "@/modules/claim/ClaimObject";

interface Props {
  claim: ClaimObject;
}

export const ClaimFooterCardResolve = (props: Props) => {
  const current = props.claim.summary().total;
  const selected = props.claim.selected();
  const total = Object.keys(props.claim.samples()).length;

  const percentage = ((current / total) * 100).toFixed(0);
  const probability = props.claim.summary().probability.toFixed(0);

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
          <strong>{percentage}%</strong> of the voters say the associated claim has a <strong>{probability}%</strong> chance to be true.
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

      {props.claim.expired() === true && (
        <div>
          <Separator.Horizontal />

          {props.claim.challenge() === true ? (
            <div>
              This market expired with a valid resolution, but can still be disputed.
            </div>
          ) : (
            <div>
              This market expired with {props.claim.valid() ? "a valid" : "an invalid"} resolution, and cannot be disputed anymore.
            </div>
          )}
        </div>
      )}
    </div>
  );
};
