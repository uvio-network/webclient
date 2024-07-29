import { CategoryLabel } from "@/components/label/CategoryLabel";
import { LifecycleLabel } from "@/components/label/LifecycleLabel";

interface Props {
  labels: string[];
  lifecycle: string;
}

export const LabelList = (props: Props) => {
  return (
    <div className="flex">
      <LifecycleLabel lifecycle={props.lifecycle} />

      {props.labels.map((x, i) => (
        <CategoryLabel key={i} text={x} />
      ))}
    </div>
  );
};
