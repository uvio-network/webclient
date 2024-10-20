import { LabelList } from "@/components/label/LabelList";
import { LifecycleObject } from "@/modules/lifecycle/LifecycleObject";

interface Props {
  expand: (() => void) | undefined;
  labels: string[];
  lifecycle: LifecycleObject;
  pending: boolean;
}

export const ClaimLabels = (props: Props) => {
  return (
    <div className="my-4">
      <LabelList
        expand={props.expand}
        labels={props.labels}
        lifecycle={props.lifecycle}
        pending={props.pending}
        target={undefined}
      />
    </div>
  );
};
