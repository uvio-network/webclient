import Link from "next/link";

import { CategoryLabel } from "@/components/label/CategoryLabel";
import { LifecycleLabel } from "@/components/label/LifecycleLabel";

interface Props {
  labels: string[];
  lifecycle: string;
  target?: string;
}

export const LabelList = (props: Props) => {
  return (
    <div className="flex py-1">
      <LifecycleLabel lifecycle={props.lifecycle} />

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
