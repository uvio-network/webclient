import { LabelList } from "@/components/label/LabelList";

interface Props {
  labels: string[];
  lifecycle: string;
  pending: boolean;
}

export const ClaimLabels = (props: Props) => {
  return (
    <div className="px-2">
      <LabelList
        labels={props.labels}
        lifecycle={props.lifecycle}
        pending={props.pending}
      />
    </div>
  );
};
