"use client";

import * as Separator from "@/components/layout/separator";

import { ClaimObject } from "@/modules/claim/ClaimObject";

interface Props {
  claim: ClaimObject;
}

export const ClaimFooterCardPropose = (props: Props) => {
  const hsitg = props.claim.upside().hsitg;
  const token = props.claim.token();

  const probability = props.claim.votes().probability.toFixed(0);
  const total = (props.claim.votes().agreement + props.claim.votes().disagreement).toFixed(2);

  const stakeAgree = props.claim.upside().stake[0];
  const stakeDisagree = props.claim.upside().stake[1];

  const shareAgree = props.claim.upside().share[0].toFixed(0);
  const shareDisagree = props.claim.upside().share[1].toFixed(0);

  return (
    <div>
      This claim has a probability of <strong>{probability}%</strong> to be true, based on a total of {total} {token} staked.

      {stakeAgree !== 0 && (
        <div>
          <Separator.Horizontal />

          <div>
            You have {stakeAgree} {token} staked in <strong>agreement</strong> with the claim&apos;s statement.

            {shareAgree !== "0" && (
              <div>
                <br /><br />

                Your potential upside is currently <strong>{shareAgree}%</strong>, for which this market must be resolved in agreement with the claim&apos;s statement.
              </div>
            )}
          </div>
        </div>
      )}

      {stakeDisagree !== 0 && (
        <div>
          <Separator.Horizontal />

          <div>
            You have {stakeDisagree} {token} staked in <strong>disagreement</strong> with the claim&apos;s statement.

            {shareDisagree !== "0" && (
              <div>
                <br /><br />

                Your potential upside is currently <strong>{shareDisagree}%</strong>, for which this market must be resolved in disagreement with the claim&apos;s statement.
              </div>
            )}
          </div>
        </div>
      )}

      {hsitg === false && (
        <div>
          <Separator.Horizontal />

          <div>
            You have no reputation staked in this market.
          </div>
        </div>
      )}
    </div>
  );
};
