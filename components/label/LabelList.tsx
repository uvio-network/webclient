import Link from "next/link";

import { BaseButton } from "@/components/button/BaseButton";
import { BaseLabel } from "@/components/label/BaseLabel";
import { ExpandIcon } from "@/components/icon/ExpandIcon";
import { LifecycleObject } from "@/modules/lifecycle/LifecycleObject";
import { Tooltip } from "@/components/tooltip/Tooltip";

interface Props {
  expand: (() => void) | undefined;
  labels: string[];
  lifecycle: LifecycleObject;
  pending: boolean;
  target: string | undefined;
}

export const LabelList = (props: Props) => {
  return (
    <div className="flex">
      <div className="flex gap-x-2 gap-y-2">
        {props.pending ? (
          <Tooltip
            content={
              <>
                Lifecycle <strong>{props.lifecycle.phase()}</strong> once the claim&apos;s transaction has been finalized onchain.
              </>
            }
            trigger={
              <BaseLabel className="cursor-default" dashed={true} color="rose" text="pending" />
            }
          />
        ) : (
          <Link
            href={`/claim/lifecycle/${props.lifecycle.phase()}`}
            target={props.target}
          >
            <BaseLabel color={props.lifecycle.color()} text={props.lifecycle.phase()} />
          </Link>
        )}

        {props.expand !== undefined && (
          <BaseButton
            background="none"
            icon={<ExpandIcon />}
            onClick={props.expand}
            padding="px-1 py-[1px]"
          />
        )}
      </div>

      <div className="w-full grid place-content-end">
        <div className="flex flex-wrap gap-x-2 gap-y-2 place-content-end">
          {props.labels.map((x, i) => (
            <Link
              key={i}
              href={`/claim/label/${x}`}
              target={props.target}
            >
              <BaseLabel color="gray" text={x} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
