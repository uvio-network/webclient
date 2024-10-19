import Link from "next/link";

import { BaseLabel } from "@/components/label/BaseLabel";
import { Tooltip } from "@/components/tooltip/Tooltip";

interface Props {
  comment: boolean;
  labels: string[];
  lifecycle: string;
  pending: boolean;
  target: string | undefined;
  valid: boolean | undefined;
}

export const LabelList = (props: Props) => {
  let lif = props.lifecycle;

  if (lif === "balance") {
    lif = "settled";
  }

  let col: "blue" | "gray" | "green" | "rose" = "blue";

  if (lif === "dispute") {
    col = "rose";
  }

  if (lif === "settled" && props.valid === true) {
    col = "green";
  }

  if (lif === "settled" && props.valid === false) {
    col = "rose";
  }

  return (
    <div className="flex flex-wrap gap-x-2 gap-y-2">
      {props.comment ? (
        <Tooltip
          content={
            <>
              This post is a comment on the embedded claim.
            </>
          }
          trigger={
            <BaseLabel className="cursor-default" colour="blue" text="comment" />
          }
        />
      ) : (
        <>
          {props.pending ? (
            <Tooltip
              content={
                <>
                  Lifecycle <strong>{lif}</strong> once the claim&apos;s transaction has been finalized onchain.
                </>
              }
              trigger={
                <BaseLabel className="cursor-default" dashed={true} colour="rose" text="pending" />
              }
            />
          ) : (
            <Link
              href={`/claim/lifecycle/${lif}`}
              target={props.target}
            >
              <BaseLabel colour={col} text={lif} />
            </Link>
          )}
        </>
      )}

      {props.labels.map((x, i) => (
        <Link
          key={i}
          href={`/claim/label/${x}`}
          target={props.target}
        >
          <BaseLabel colour="gray" text={x} />
        </Link>
      ))}
    </div>
  );
};
