import { LabelList } from "@/components/label/LabelList";

interface Props {
  comment: boolean;
  labels: string[];
  lifecycle: string;
  pending: boolean;
}

export const ClaimLabels = (props: Props) => {
  return (
    <div className="mt-4 px-2">
      <LabelList
        comment={props.comment}
        labels={props.labels}
        lifecycle={props.lifecycle}
        pending={props.pending}
      />
    </div>
  );
};
