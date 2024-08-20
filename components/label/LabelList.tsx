import Link from "next/link";

import { CategoryLabel } from "@/components/label/CategoryLabel";
import { LifecycleLabel } from "@/components/label/LifecycleLabel";
import { LabelCard } from "@/components/label/LabelCard";

interface Props {
  labels: string[];
  lifecycle: string;
  target?: string;
}

export const LabelList = (props: Props) => {
  return (
    <div className="flex py-1">
      {props.lifecycle === "pending" ? (
        <LabelCard text="This claim's transaction has not yet finalized onchain.">
          <LifecycleLabel dashed={true} lifecycle={props.lifecycle} />
        </LabelCard>
      ) : (
        <Link
          href={`/claim/lifecycle/${props.lifecycle}`}
          target={props.target}
        >
          <LifecycleLabel dashed={false} lifecycle={props.lifecycle} />
        </Link>
      )}

      {props.labels.map((x, i) => (
        <Link
          key={i}
          href={`/claim/label/${x}`}
          target={props.target}
        >
          <CategoryLabel text={x} />
        </Link>
      ))}
    </div>
  );
};
