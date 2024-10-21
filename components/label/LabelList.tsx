import Link from "next/link";

import { BaseLabel } from "@/components/label/BaseLabel";

interface Props {
  labels: string[];
  target: string | undefined;
}

export const LabelList = (props: Props) => {
  return (
    <div className="w-full">
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
  );
};
