import { LabelList } from "@/components/label/LabelList";

interface Props {
  comment: boolean;
  labels: string[];
  lifecycle: string;
  pending: boolean;
}

export const ClaimLabels = (props: Props) => {
  return (
    <div className="my-4">
      <LabelList
        comment={props.comment}
        labels={props.labels}
        lifecycle={props.lifecycle}
        pending={props.pending}
      />
    </div>
  );
};
