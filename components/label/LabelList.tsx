import Link from "next/link";

import { BaseLabel } from "@/components/label/BaseLabel";
import { Tooltip } from "@/components/tooltip/Tooltip";

interface Props {
  comment: boolean;
  labels: string[];
  lifecycle: string;
  pending: boolean;
  target?: string;
}

export const LabelList = (props: Props) => {
  let col: "blue" | "rose" | "gray" = "blue";

  if (props.lifecycle === "dispute") {
    col = "rose";
  }

  // TODO we need to set green and we need to create those settled objects
  //
  // if (props.lifecycle === "settled") {
  //   col = "green";
  // }

  return (
    <div className="flex">
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
                  Lifecycle <strong>{props.lifecycle}</strong> once the claim&apos;s transaction has been finalized onchain.
                </>
              }
              trigger={
                <BaseLabel className="cursor-default" dashed={true} colour="rose" text="pending" />
              }
            />
          ) : (
            <Link
              href={`/claim/lifecycle/${props.lifecycle}`}
              target={props.target}
            >
              <BaseLabel colour={col} text={props.lifecycle} />
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
